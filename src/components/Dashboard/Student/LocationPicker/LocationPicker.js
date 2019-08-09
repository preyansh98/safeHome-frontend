import React, {Component} from 'react'; 
import {View, TextInput, Alert} from 'react-native'; 
import { Container, Header, Item, Input, Content, Icon } from 'native-base';

export default class LocationPicker extends Component { 

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
        <Header />
        <Content>
          <Item>
            <Input placeholder="Enter your pickup address"/>
            <Icon style = {{marginRight: 10, color: "blue"}} active name = "paper-plane"/>
          </Item>
          <Item>
            <Input placeholder="Enter your destination address" />
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
