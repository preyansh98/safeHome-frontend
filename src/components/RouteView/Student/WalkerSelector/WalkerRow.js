import {React, Component} from 'react'; 
import {View, Text, StyleSheet} from 'react-native';
import config from '../../../../config/config';

export default class WalkerRow extends Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    onPressSelectButton() {
        let selectedWalkerID = this.props.walker_id;
        this.selectWalkerCall(selectedWalkerID);
    }

    render(){
        return(
            //make a component of a list type thing.
            //select button in each, should be tied to that walker. 
            <View>
                <Text>{this.props.walker_name}</Text>
                <Text>Rating: {this.props.walker_rating}</Text>
                
                <TouchableOpacity
                onPress={this.onPressSelectButton.bind(this)}
                >       
                    <Text styles={styles.buttonText}>Select</Text>
                </TouchableOpacity> 
            </View>
        );
    }

    async selectWalkerCall(selectedWalkerID){
        var data ={
            studentID:this.state.mcgillid, //from global state
            walkerID:selectedWalkerID
          };
          try {
            let response = await fetch(encodeURI(
             config.backendUrls.selectWalkerAPI + "/" + data.studentID + "/" + "?walkerID=" + selectedWalkerID),
             {
               method: "POST"
            }
           );
            if (response.status >= 200 && response.status < 300) {
              let responseJson = response.json;
              return responseJson; 
            }
            else{
              alert("Unsuccesful" + response.status);
            }
          } catch (errors) {
            alert(errors);
           } 
        return "error"; 
    }
}