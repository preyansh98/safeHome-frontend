import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Container, Right, Item, Input, Content, Icon, List, ListItem, Button } from 'native-base';
import { GMAPS_API_KEY } from 'react-native-dotenv';
import config from '../../../../config/config';

const { width, height } = Dimensions.get('screen');

export default class LocationEntry extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.setState({ autocomplete_session_token: Math.random().toString(36).substring(4) });
  }

  state = {
    submitReady: false,
    autocomplete_session_token: "",
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
          <ListItem key={"_" + item} button onPress={() => { this.suggestionClicked(item) }}><Text>{item}</Text></ListItem>
        );
      });
    }
  }

  makeQueryMap() {
    let queryMap = new Map();
    queryMap.set('key', GMAPS_API_KEY);
    queryMap.set('input', (this.state.pickupSet) ? this.state.destTextToQuery
      : this.state.pickupTextToQuery);
    queryMap.set('sessiontoken', this.state.autocomplete_session_token);
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

  makeCreateReqMap() {
    let queryMap = new Map();
    queryMap.set('pickup_lat', this.state.pickupLoc.latitude);
    queryMap.set('pickup_long', this.state.pickupLoc.longitude);
    queryMap.set('dest_lat', this.state.destLoc.latitude);
    queryMap.set('dest_long', this.state.destLoc.longitude);

    return queryMap;
  }

  returnCreateReqQueryString() {
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
    queryMap.set('key', GMAPS_API_KEY);
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
    //geocode pickup
    this.geocodeLocations(this.state.pickupTextToQuery).then(response => {
      if (response.status == "OK") {
        let pickup_coords = this.state.pickupLoc;
        pickup_coords.latitude = response.results[0].geometry.location.lat;
        pickup_coords.longitude = response.results[0].geometry.location.lng;
        this.setState({ pickupLoc: pickup_coords });
      }
    }).catch(function (error) {
      return alert(error);
    }).then(() => {
      //geocode destination
      this.geocodeLocations(this.state.destTextToQuery).then(response => {
        console.log("querying destination");
        if (response.status == "OK") {
          let dest_coords = this.state.destLoc;
          console.log("the destlatitude is: " + response.results[0].geometry.location.lat);
          dest_coords.latitude = response.results[0].geometry.location.lat;
          dest_coords.longitude = response.results[0].geometry.location.lng;
          this.setState({ destLoc: dest_coords });
        }
      }).catch(function (error) {
        return alert(error);
      }).then(() =>
        this.setMapMarkersAndNavigate());
    }).catch(function (error) {
      return alert(error);
    })
  }

  setMapMarkersAndNavigate = () => {
    global.pickup_lat = this.state.pickupLoc.latitude;
    global.pickup_lng = this.state.pickupLoc.longitude;
    global.dest_lat = this.state.destLoc.latitude;
    global.dest_lng = this.state.destLoc.longitude;

    setTimeout(() => this.props.navigation.navigate('StudentRoute', {
      pickup_lat: this.state.pickupLoc.latitude,
      pickup_lng: this.state.pickupLoc.longitude,
      dest_lat: this.state.destLoc.latitude,
      dest_lng: this.state.destLoc.longitude,
    }), 500);
  }

  //END
  //----------------------------------------------->

  async geocodeLocations(addressToQuery) {
    try {
      let response = await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json" + this.returnGeocodeQueryString(addressToQuery)
        ,
        {
          method: "GET"
        }
      );
      if (response.status >= 200 & response.status < 300) {
        let responseJson = await response.json();
        return responseJson;
      } else {
        alert("Unsuccesful" + error);
      }
    } catch (error) {
      alert(error);
    }
    // console.log("geocoding location");
    // return this.getSampleGeocodeResponse();
  }

  async makeAutocompleteCall() {
    try {
      let response = await fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json" + this.returnQueryString());
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

