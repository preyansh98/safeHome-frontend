import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, Alert } from 'react-native';
import { List, Header, Container, Content, ListItem } from 'native-base';

const { width, height } = Dimensions.get('screen');

export default class AutocompleteEntry extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        inputtext: '',
        suggestions: []
    }

    changeTextHandler = (text) => {
        this.setState({inputtext: text}, () => {
            (text == "") ? (this.clearSuggestions()) : (this.makeCall()); 
        });
    }

    render() {
        return (
            <View styles={{ flex: 1 }}>
                <List>
                    {this.renderSuggestions()}
                </List>
            </View>
        );
    }

    clearSuggestions(){
        this.setState({suggestions: []}, () => {
            this.renderSuggestions(); 
        });
    }

    renderSuggestions(){
        if(this.state.suggestions.length==0){
            return (<Text></Text>); 
        } else{
            return this.state.suggestions.map((item) => {
                return(
                <ListItem><Text>{item}</Text></ListItem>
                );
            }); 
        }
    }

    makeQueryMap() {
        let queryMap = new Map();
        queryMap.set('key', global.MAPS_API_KEY);
        queryMap.set('input', this.state.inputtext);
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
            (counter == 0) ? (queryString += "?" + key + "=" + value) : (queryString+= "&" + key + "=" + value);
            counter++; 
        });

        return queryString;
    }

    mapPlaceResponseToState(responseJson){
        if(responseJson.status==="OK"){
        let predictions = responseJson.predictions; 
        let suggestionsList = []; 
        predictions.forEach((entry) => {
            suggestionsList.push(entry.description); 
        }); 

        this.setState({suggestions:suggestionsList}, () => {
            //callback will be to re-render list. 
        }); 
    }
    }

    async makeCall() {
        // try {
        //     let response = await fetch(
        //         "https://maps.googleapis.com/maps/api/place/autocomplete/json" + this.returnQueryString(),
        //         {
        //             method: "GET"
        //         }
        //     );
        //     if (response.status >= 200 && response.status < 300) {
        //         let responseJson = await response.json();
        //         this.mapPlaceResponseToState(responseJson); 
        //         return responseJson;
        //     }
        //     else {
        //         alert("Unsuccesful" + response.status);
        //     }
        // } catch (errors) {
        //     alert(errors);
        // }

        let responseJson = this.getSampleResponse(); 
        this.mapPlaceResponseToState(responseJson);
        return responseJson; 
    }

    getSampleResponse(){
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


