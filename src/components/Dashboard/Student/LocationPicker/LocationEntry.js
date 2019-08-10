import React, {Component} from 'react'; 
import {View, Text, Dimensions, StyleSheet} from 'react-native'; 
import { Container, Header, Item, Input, Content, Icon, List,ListItem } from 'native-base';
import AutocompleteEntry from './AutocompleteEntry';

const {width,height} = Dimensions.get('screen');

export default class LocationEntry extends Component { 

  constructor(props){
    super(props); 
  }
  
  state = {
    pickupLoc: {
      latitude: null,
      longitude: null
    },
    destLoc : {
      latitude : null, 
      longitude: null
    },
    expanded: false,
  }

  render(){
    return(
        <Container>
        <Content>
          <Item>
            <Input autoFocus placeholder="Enter your pickup address" returnKeyType='next'
              onChangeText={text => this.refs.autocomplete.changeTextHandler(text)}                   
            />
            <Icon style = {{marginRight: 10, color: "blue"}} active name = "paper-plane"/>
          </Item>
          <Item>
            <Input placeholder="Enter your destination address" returnKeyType='done'/>
          </Item>
          <Item>
            <AutocompleteEntry ref = 'autocomplete'/>
          </Item>
        </Content>
      </Container>
    );

    
  }
  async createRequest() {
    var data ={
      pickup_location : this.state.pickupLoc, 
      destination_location : this.state.destLoc
    };
    try {
      let response = await fetch(encodeURI(
       "http://192.168.0.13:8080/api/" + "createRequest/" + data.mcgillID +"?pickup_lat=" + data.pickup_location.latitude + 
       "?pickup_long=" + data.pickup_location.longitude + "?dest_lat=" + data.destination_location.latitude + 
       "?dest_long=" + data.destination_location.longitude),
       {
         method: "POST"
      }
     );
      if (response.status >= 200 && response.status < 300) {
        let responseJson = response.json;
        alert("json resp:" + responseJson.status);
      }
      else{
        alert("Unsuccesful" + response.status);
      }
    } catch (errors) {
      alert(errors);
     } 
  }
}

const styles = StyleSheet.create({
  buttonStyle:{
    padding: 20,
    marginTop: 50,
    width: width*0.6, 
    alignSelf: 'center', 
    justifyContent: 'center'
  }, 
  buttonText: {
    fontSize: 18,
  }

})