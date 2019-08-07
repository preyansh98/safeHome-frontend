import {React, Component} from 'react'; 
import {Text, View, StyleSheet} from 'react-native'; 

export default class LocationPicker extends Component(){

    constructor(props){
        super(props); 

        this.state={
            pickupLoc : {
                latitude : "", 
                longitude : ""
            }, 
            destLoc: {
                latitude : "",
                longitude: ""
            }
        }
    }

    render(){
        return(
            <View>
                <Text>basic stub</Text>
            </View>
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

