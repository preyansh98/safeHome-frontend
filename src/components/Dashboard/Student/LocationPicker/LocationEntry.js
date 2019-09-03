import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Container, Right, Item, Input, Content, Icon, List, ListItem, Button } from 'native-base';
import AutocompleteEntry from './AutocompleteEntry';

const { width, height } = Dimensions.get('screen');

export default class LocationEntry extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    submitReady: false,
    pickupLoc: {
      latitude: null,
      longitude: null
    },
    destLoc: {
      latitude: null,
      longitude: null
    },
    pickupTextToQuery: '',
    pickupTextToDisplay: '',
    pickupSet: false,
    destSet: false,
    destTextToQuery: '',
    suggestions: []
  }

  render() {
    return (
      <Container>
        <Content>
          <Item>
            <Input autoFocus placeholder="Enter your pickup address" returnKeyType='next'
              value={this.state.pickupTextToDisplay}
              onChangeText={text => this.changeTextHandler(text)}
            />
            <Icon style={{ marginRight: 10, color: "blue" }} active name="paper-plane" />
          </Item>
          <Item>
            <Input placeholder="Enter your destination address" returnKeyType='done'
              value={this.state.destTextToDisplay}
              onChangeText={text => this.changeDestinationTextHandler(text)}
            />
          </Item>
          <Item style={{ borderWidth: 0, borderColor: 'transparent', backgroundColor: 'silver' }}>
            <Right><Button
              icon style={styles.goButton} success
              disabled={!this.state.submitReady}
              onPress={() => this.geocodeAndCreateRequest()}
            ><Icon style={{ alignSelf: 'center' }} name='checkmark-circle' /></Button>
            </Right>
          </Item>
          <Item style={{ borderWidth: 0, borderColor: 'transparent' }}>
            <List>
              {this.renderSuggestions()}
            </List>
          </Item>
        </Content>
      </Container>
    );
  }

  //AUTOCOMPLETE CODE::
  //<!-------------------------------------------
  changeTextHandler = (text) => {
    this.setState({ pickupTextToQuery: text }, () => {
      if (this.state.pickupSet) { this.setState({ pickupSet: false }); }
      this.setState({ pickupTextToDisplay: text });
      (text == "") ? (this.clearSuggestions()) : (this.makeAutocompleteCall());
    });
  }

  changeDestinationTextHandler = (text) => {
    this.setState({ destTextToQuery: text }, () => {
      if (this.state.destSet) { this.setState({ destSet: false }); }
      this.setState({ destTextToDisplay: text });
      (text == "") ? (this.clearSuggestions()) : (this.makeAutocompleteCall());
    });
  }

  clearSuggestions() {
    this.setState({ suggestions: [] }, () => {
      this.renderSuggestions();
    });
  }

  suggestionClicked = (text) => {
    //if pickup set is false, then we are editing pickup location: 
    if (this.state.pickupSet == false) {
      this.setState({ pickupTextToQuery: text });

      //display ui
      this.setState({ pickupTextToDisplay: text.substring(0, text.indexOf(',')) });
      this.setState({ pickupSet: true });
    } else {
      this.setState({ destTextToQuery: text });

      //display ui
      this.setState({ destTextToDisplay: text.substring(0, text.indexOf(',')) });
      this.setState({ destSet: true });
      this.setState({ submitReady: true });
    }
    //if pickup set is true, then we are editing destination: 
    this.clearSuggestions();
  }

  renderSuggestions() {
    if (this.state.suggestions.length == 0) {
      return (<Text></Text>);
    } else {
      return this.state.suggestions.map((item) => {
        return (
          <ListItem button onPress={() => { this.suggestionClicked(item) }}><Text>{item}</Text></ListItem>
        );
      });
    }
  }

  makeQueryMap() {
    let queryMap = new Map();
    queryMap.set('key', global.MAPS_API_KEY);
    queryMap.set('input', (this.state.pickupSet) ? this.state.destTextToQuery
    : this.state.pickupTextToQuery);
    queryMap.set('sessiontoken', Math.random().toString(36).substring(4));
    queryMap.set('types', 'address');
    queryMap.set('components', 'country:ca');

    return queryMap;
  }

  returnQueryString() {
    let queryMap = this.makeQueryMap();
    let queryString = "";

    let counter = 0;
    queryMap.forEach((value, key) => {
      //for get url query params. start with ?, other params start with &.
      (counter == 0) ? (queryString += "?" + key + "=" + value) : (queryString += "&" + key + "=" + value);
      counter++;
    });

    return queryString;
  }

  makeCreateReqMap(){
    let queryMap = new Map(); 
    queryMap.set('pickup_lat', this.state.pickupLoc.latitude);
    queryMap.set('pickup_long', this.state.pickupLoc.longitude);
    queryMap.set('dest_lat', this.state.destLoc.latitude);
    queryMap.set('dest_long', this.state.destLoc.longitude);

    return queryMap; 
  }

  returnCreateReqQueryString(){
    let queryMap = this.makeCreateReqMap();
    let queryString = "";

    let counter = 0;
    queryMap.forEach((value, key) => {
      //for get url query params. start with ?, other params start with &.
      (counter == 0) ? (queryString += "?" + key + "=" + value) : (queryString += "&" + key + "=" + value);
      counter++;
    });

    return queryString;
  }

  makeGeocodeMap(addressToQuery) {
    let queryMap = new Map();
    queryMap.set('key', global.MAPS_API_KEY);
    queryMap.set('address', encodeURI(addressToQuery));
    queryMap.set('components', 'country:ca');

    return queryMap;
  }

  returnGeocodeQueryString(addressToQuery) {
    let queryMap = this.makeGeocodeMap(addressToQuery);
    let queryString = "";

    let counter = 0;
    queryMap.forEach((value, key) => {
      //for get url query params. start with ?, other params start with &.
      (counter == 0) ? (queryString += "?" + key + "=" + value) : (queryString += "&" + key + "=" + value);
      counter++;
    });

    return queryString;
  }

  

  mapPlaceResponseToState(responseJson) {
    if (responseJson.status === "OK") {
      let predictions = responseJson.predictions;
      let suggestionsList = [];
      predictions.forEach((entry) => {
        suggestionsList.push(entry.description);
      });

      this.setState({ suggestions: suggestionsList }, () => {
        //callback will be to re-render list. 
      });
    }
  }

  geocodeAndCreateRequest() {

    this.geocodeLocations(this.state.pickupTextToQuery).then(response => {
      console.log("picked up result: " + response);
      if (response.status == "OK") {
        let pickup_coords = this.state.pickupLoc;
        console.log("the latitude is: " + response.results[0].geometry.location.lat);
        pickup_coords.latitude = response.results[0].geometry.location.lat;
        pickup_coords.longitude = response.results[0].geometry.location.lng;
        this.setState({ pickupLoc: pickup_coords });
      }
      else {
        //failure resposne.
      }
    }).catch(function (error) {
      return alert(error);
    }).then(() => {
      this.geocodeLocations(this.state.destTextToQuery).then(response => {
        console.log("querying destination");
        if (response.status == "OK") {
          let dest_coords = this.state.destLoc;
          console.log("the destlatitude is: " + response.results[0].geometry.location.lat);
          dest_coords.latitude = response.results[0].geometry.location.lat;
          dest_coords.longitude = response.results[0].geometry.location.lng;
          this.setState({ destLoc: dest_coords });
        }
        else {
          //promise failure
        }
      }).catch(function (error) {
        return alert(error);
      }).then(() => {
        //create request
        this.createRequest().then(response => {
          //set map, and navigate back.
          this.setMapMarkersAndNavigate();
        }).catch(function(error){
          return alert(error);
        })
      }).catch(function (error) {
        return alert(error);
      })
    });
  }

  setMapMarkersAndNavigate = () => {
    global.pickup_lat = this.state.pickupLoc.latitude;
    global.pickup_lng = this.state.pickupLoc.longitude;
    global.dest_lat= this.state.destLoc.latitude;
    global.dest_lng= this.state.destLoc.longitude;

    setTimeout(() => this.props.navigation.navigate( 'StudentRoute', {
        dest_lat : this.state.destLoc.latitude, 
        dest_lng : this.state.destLoc.dest_lng,
    }), 500);
  }

  //END
  //----------------------------------------------->

  async geocodeLocations(addressToQuery) {
    try{
      let response = await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json" + this.returnGeocodeQueryString(addressToQuery) 
      ,
      {
        method: "GET"
      }
      ); 
      if(response.status >= 200 & response.status<300){
        let responseJson = await response.json(); 
        return responseJson; 
      } else{
        alert("Unsuccesful" + error); 
      }
    } catch (error){
      alert(error);
    }
    // console.log("geocoding location");
    // return this.getSampleGeocodeResponse();
  }

  async createRequest() {
    var data = {
      mcgillID: global.mcgill_id,
      pickup_location: this.state.pickupLoc,
      destination_location: this.state.destLoc
    };
    console.log("hitting endpoint:" + encodeURI(
      global.API_ENDPOINT + "createRequest/" + data.mcgillID + this.returnCreateReqQueryString()));
    try {
      let response = await fetch(encodeURI(
        global.API_ENDPOINT + "createRequest/" + data.mcgillID + this.returnCreateReqQueryString()),
        {
          method: "POST"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let responseJson = await response.json();
        return responseJson; 
      }
      else {
        alert("Unsuccesful" + response.status);
      }
    } catch (errors) {
      alert(errors);
    }
  }

  async makeAutocompleteCall() {
    try {
        let response = await fetch(
            "https://maps.googleapis.com/maps/api/place/autocomplete/json" + this.returnQueryString(),
            {
                method: "GET"
            }
        );
        if (response.status >= 200 && response.status < 300) {
            let responseJson = await response.json();
            this.mapPlaceResponseToState(responseJson); 
            return responseJson;
        }
        else {
            alert("Unsuccesful" + response.status);
        }
    } catch (errors) {
        alert(errors);
    }

    // let responseJson = this.getSampleResponse();
    // this.mapPlaceResponseToState(responseJson);
    // return responseJson;
  }

  getSampleGeocodeResponse() {
    return {
      "results": [
        {
          "address_components": [
            {
              "long_name": "1755",
              "short_name": "1755",
              "types": [
                "street_number"
              ]
            },
            {
              "long_name": "Rathburn Road East",
              "short_name": "Rathburn Rd E",
              "types": [
                "route"
              ]
            },
            {
              "long_name": "Rockwood Village",
              "short_name": "Rockwood Village",
              "types": [
                "neighborhood",
                "political"
              ]
            },
            {
              "long_name": "Mississauga",
              "short_name": "Mississauga",
              "types": [
                "locality",
                "political"
              ]
            },
            {
              "long_name": "Regional Municipality of Peel",
              "short_name": "Regional Municipality of Peel",
              "types": [
                "administrative_area_level_2",
                "political"
              ]
            },
            {
              "long_name": "Ontario",
              "short_name": "ON",
              "types": [
                "administrative_area_level_1",
                "political"
              ]
            },
            {
              "long_name": "Canada",
              "short_name": "CA",
              "types": [
                "country",
                "political"
              ]
            },
            {
              "long_name": "L4W 2M8",
              "short_name": "L4W 2M8",
              "types": [
                "postal_code"
              ]
            }
          ],
          "formatted_address": "1755 Rathburn Rd E, Mississauga, ON L4W 2M8, Canada",
          "geometry": {
            "location": {
              "lat": 43.6344485,
              "lng": -79.60009529999999
            },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": {
                "lat": 43.63579748029149,
                "lng": -79.5987463197085
              },
              "southwest": {
                "lat": 43.63309951970849,
                "lng": -79.6014442802915
              }
            }
          },
          "place_id": "ChIJGwKsd2Q4K4gRuAa8jLoI71M",
          "plus_code": {
            "compound_code": "J9MX+QX Mississauga, Ontario, Canada",
            "global_code": "87M2J9MX+QX"
          },
          "types": [
            "street_address"
          ]
        }
      ],
      "status": "OK"
    }
  }

  getSampleResponse() {
    return {
      "predictions": [
        {
          "description": "1755 Rathburn Road East, Mississauga, ON, Canada",
          "id": "aa9ea7a2eef4d603f8f0306e9409f5db38d5bf3e",
          "matched_substrings": [
            {
              "length": 4,
              "offset": 0
            },
            {
              "length": 3,
              "offset": 5
            }
          ],
          "place_id": "ChIJGwKsd2Q4K4gRuAa8jLoI71M",
          "reference": "ChIJGwKsd2Q4K4gRuAa8jLoI71M",
          "structured_formatting": {
            "main_text": "1755 Rathburn Road East",
            "main_text_matched_substrings": [
              {
                "length": 4,
                "offset": 0
              },
              {
                "length": 3,
                "offset": 5
              }
            ],
            "secondary_text": "Mississauga, ON, Canada"
          },
          "terms": [
            {
              "offset": 0,
              "value": "1755"
            },
            {
              "offset": 5,
              "value": "Rathburn Road East"
            },
            {
              "offset": 25,
              "value": "Mississauga"
            },
            {
              "offset": 38,
              "value": "ON"
            },
            {
              "offset": 42,
              "value": "Canada"
            }
          ],
          "types": [
            "street_address",
            "geocode"
          ]
        },
        {
          "description": "1755 Ratter Lake Road, Markstay, ON, Canada",
          "id": "8a47f0a9b276f9b21168717cc17ea945a1d0c683",
          "matched_substrings": [
            {
              "length": 8,
              "offset": 0
            }
          ],
          "place_id": "EisxNzU1IFJhdHRlciBMYWtlIFJvYWQsIE1hcmtzdGF5LCBPTiwgQ2FuYWRhIjESLwoUChIJX7ZULh8kL00Rivmr2XDl8ZUQ2w0qFAoSCXnq5mRUIS9NEeeB-qXa-NA1",
          "reference": "EisxNzU1IFJhdHRlciBMYWtlIFJvYWQsIE1hcmtzdGF5LCBPTiwgQ2FuYWRhIjESLwoUChIJX7ZULh8kL00Rivmr2XDl8ZUQ2w0qFAoSCXnq5mRUIS9NEeeB-qXa-NA1",
          "structured_formatting": {
            "main_text": "1755 Ratter Lake Road",
            "main_text_matched_substrings": [
              {
                "length": 8,
                "offset": 0
              }
            ],
            "secondary_text": "Markstay, ON, Canada"
          },
          "terms": [
            {
              "offset": 0,
              "value": "1755 Ratter Lake Road"
            },
            {
              "offset": 23,
              "value": "Markstay"
            },
            {
              "offset": 33,
              "value": "ON"
            },
            {
              "offset": 37,
              "value": "Canada"
            }
          ],
          "types": [
            "street_address",
            "geocode"
          ]
        },
        {
          "description": "1755 Rathburn Road West, Mississauga, ON, Canada",
          "id": "229d07e927f6e559f30c45101cc15cf88c4d9765",
          "matched_substrings": [
            {
              "length": 8,
              "offset": 0
            }
          ],
          "place_id": "EjAxNzU1IFJhdGhidXJuIFJvYWQgV2VzdCwgTWlzc2lzc2F1Z2EsIE9OLCBDYW5hZGEiMRIvChQKEglhW-qCKkEriBE4mqAszqF0LhDbDSoUChIJDzLrBSxBK4gRiWyAUmTTVB4",
          "reference": "EjAxNzU1IFJhdGhidXJuIFJvYWQgV2VzdCwgTWlzc2lzc2F1Z2EsIE9OLCBDYW5hZGEiMRIvChQKEglhW-qCKkEriBE4mqAszqF0LhDbDSoUChIJDzLrBSxBK4gRiWyAUmTTVB4",
          "structured_formatting": {
            "main_text": "1755 Rathburn Road West",
            "main_text_matched_substrings": [
              {
                "length": 8,
                "offset": 0
              }
            ],
            "secondary_text": "Mississauga, ON, Canada"
          },
          "terms": [
            {
              "offset": 0,
              "value": "1755 Rathburn Road West"
            },
            {
              "offset": 25,
              "value": "Mississauga"
            },
            {
              "offset": 38,
              "value": "ON"
            },
            {
              "offset": 42,
              "value": "Canada"
            }
          ],
          "types": [
            "street_address",
            "geocode"
          ]
        },
        {
          "description": "1755 Rathkeale Road, Mississauga, ON, Canada",
          "id": "5960994e27f324ead367722fb069cc7a180ce4c2",
          "matched_substrings": [
            {
              "length": 8,
              "offset": 0
            }
          ],
          "place_id": "EiwxNzU1IFJhdGhrZWFsZSBSb2FkLCBNaXNzaXNzYXVnYSwgT04sIENhbmFkYSIxEi8KFAoSCWtUeB0WQSuIEbWce1k70IKEENsNKhQKEglN1xekFkEriBGoFi-mNhtBIw",
          "reference": "EiwxNzU1IFJhdGhrZWFsZSBSb2FkLCBNaXNzaXNzYXVnYSwgT04sIENhbmFkYSIxEi8KFAoSCWtUeB0WQSuIEbWce1k70IKEENsNKhQKEglN1xekFkEriBGoFi-mNhtBIw",
          "structured_formatting": {
            "main_text": "1755 Rathkeale Road",
            "main_text_matched_substrings": [
              {
                "length": 8,
                "offset": 0
              }
            ],
            "secondary_text": "Mississauga, ON, Canada"
          },
          "terms": [
            {
              "offset": 0,
              "value": "1755 Rathkeale Road"
            },
            {
              "offset": 21,
              "value": "Mississauga"
            },
            {
              "offset": 34,
              "value": "ON"
            },
            {
              "offset": 38,
              "value": "Canada"
            }
          ],
          "types": [
            "street_address",
            "geocode"
          ]
        },
        {
          "description": "1755 Rattenbury Road, Breadalbane, PE, Canada",
          "id": "08d3c574e76ac215914ab7fa7558140160001f77",
          "matched_substrings": [
            {
              "length": 8,
              "offset": 0
            }
          ],
          "place_id": "Ei0xNzU1IFJhdHRlbmJ1cnkgUm9hZCwgQnJlYWRhbGJhbmUsIFBFLCBDYW5hZGEiMRIvChQKEgmfhsKRGb5fSxFQOJOb4y2Q9RDbDSoUChIJZdwF2pK9X0sRvWUTcJI3mow",
          "reference": "Ei0xNzU1IFJhdHRlbmJ1cnkgUm9hZCwgQnJlYWRhbGJhbmUsIFBFLCBDYW5hZGEiMRIvChQKEgmfhsKRGb5fSxFQOJOb4y2Q9RDbDSoUChIJZdwF2pK9X0sRvWUTcJI3mow",
          "structured_formatting": {
            "main_text": "1755 Rattenbury Road",
            "main_text_matched_substrings": [
              {
                "length": 8,
                "offset": 0
              }
            ],
            "secondary_text": "Breadalbane, PE, Canada"
          },
          "terms": [
            {
              "offset": 0,
              "value": "1755 Rattenbury Road"
            },
            {
              "offset": 22,
              "value": "Breadalbane"
            },
            {
              "offset": 35,
              "value": "PE"
            },
            {
              "offset": 39,
              "value": "Canada"
            }
          ],
          "types": [
            "street_address",
            "geocode"
          ]
        }
      ],
      "status": "OK"
    }
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 20,
    marginTop: 50,
    width: width * 0.6,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
  },
  goButton: {
    width: width * 0.15,

    alignSelf: 'flex-end',
  }

})

