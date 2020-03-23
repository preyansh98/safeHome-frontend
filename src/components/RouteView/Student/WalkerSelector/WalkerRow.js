import React, {Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import config from '../../../../config/config';

export default class WalkerRow extends Component {
  constructor(props) {    
    console.log("in walker row");
    super(props);
  }

  async componentDidMount(){
    this.setState({walkerId : this.props.walkerId});
    this.setState({walkerRating : this.props.walkerRating});
    this.setState({isWalksafe: this.props.walkerIsWalksafe});
  }

  state = {
    walkerId: "",
    walkerRating: 0.0,
    isWalksafe: false
  }

  onPressSelectButton(id) {
    this.props.onClickWalker(id);
    //ui change.
  }

  render() {
    return (
      //make a component of a list type thing.
      //select button in each, should be tied to that walker. 
      <View>
        <Text>{this.state.walkerId}</Text>
        <Text>Rating: {this.state.walkerRating}</Text>

        <TouchableOpacity
          onPress={() => {this.onPressSelectButton(this.state.walkerId)}}
        >
          <Text>Select</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async createRequest() {
    var data = {
      mcgillID: global.mcgill_id,
      pickup_location: this.state.pickupLoc,
      destination_location: this.state.destLoc
    };
    try {
      let response = await fetch(encodeURI(config.backendUrls.createRequestAPI + "/" + data.mcgillID + this.returnCreateReqQueryString()),
        {
          method: "POST"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let responseJson = await response.json();
        return responseJson; 
      }
      else {
        alert("Unsuccesful create req" + response.status);
        return {success : "no"};
      }
    } catch (errors) {
      alert(errors);
    }
  }

  async selectWalkerCall(selectedWalkerID) {
    var data = {
      studentID: this.state.mcgillid, //from global state
      walkerID: selectedWalkerID
    };
    try {
      let response = await fetch(encodeURI(config.backendUrls.selectWalkerAPI + "/" + data.studentID + "/" + "?walkerID=" + selectedWalkerID),
        {
          method: "POST"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let responseJson = response.json();
        return responseJson;
      }
      else {
        alert("Unsuccesful" + response.status);
      }
    } catch (errors) {
      alert(errors);
    }
    return "error";
  }
}