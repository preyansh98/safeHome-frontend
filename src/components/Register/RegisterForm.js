import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Button} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

export default class RegisterForm extends Component{
    constructor(props){
      super(props);    

    this.state = {
        mcgillid:'',
        phoneno:'',
        regAsWlkr:'false',
        studentorwalker: [
          {
              label: 'Register as a Walker!',
              value: 'true'
          },
          {
              label: 'Register as a Student!',
              value:'false'
          } 
      ]
      };
    }

    onPressRadio = studentorwalker => this.setState({ studentorwalker });
    
    onPressRegisterButton() {
      let selectedButton = this.state.studentorwalker.find(e => e.selected == true);
      selectedButton = selectedButton ? selectedButton.value : this.state.studentorwalker[0].value;
      this.makeRegisterCall(selectedButton);
    }
        
    render(){
      return(
            <View style={styles.container}>   
                <Text>McGill ID: </Text>
                <TextInput style={styles.input}
                  placeholder="text"
                  returnKeyType="next"
                  placeholderTextColor="black"
                  onChangeText={text=>this.setState({mcgillid:text})}
                />
                <Text>Phone Number: </Text>
                <TextInput style={styles.input}
                  placeholder="text"
                  placeholderTextColor="black"
                  onChangeText={text=>this.setState({phoneno:text})}
                />
                <RadioGroup radioButtons={this.state.studentorwalker} onPress={this.onPressRadio} />

          <Button
              onPress={this.onPressRegisterButton.bind(this)}
              title="Register!"
              color="#841584"
              accessibilityLabel="click here to register"
          />
            </View>
        );
    }


    async makeRegisterCall(selectedButton) {
      var data ={
        mcgillID:this.state.mcgillid, 
        phoneNo:this.state.phoneno,
      };
      try {
        let response = await fetch(
         "http://192.168.0.13:8080/api/register/" + data.mcgillID +"/" + data.phoneNo +"/"+selectedButton,
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input:{
    height:40,
    width: 180,
    padding:10,
    margin: 15,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});
