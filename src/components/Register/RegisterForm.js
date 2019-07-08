import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Button} from 'react-native';
import { RadioButton } from 'react-native-paper';

export default class RegisterForm extends Component{
    constructor(props){
      super(props);

    this.state = {
        checked: 'regStudent',
        mcgillid:"",
        phoneno:""
      };

    }

    onPressRegisterButton() {
      this.makeRegisterCall();
    }
        
    render(){
        const { checked } = this.state;
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
                />r

        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'first' }); }}
        />
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'second' }); }}
        />

          <Button
              onPress={this.onPressRegisterButton.bind(this)}
              title="Register!"
              color="#841584"
              accessibilityLabel="click here to register"
          />
        
            </View>
        );
    }


    async makeRegisterCall() {
      var data ={
        mcgillID:this.state.mcgillid, 
        phoneNo:this.state.phoneno,
        regAsWlkr:false
      };
      try {
        let response = await fetch(
         "http://192.168.0.13:8080/api/register/" + data.mcgillID +"/" + data.phoneNo +"/"+data.regAsWlkr,
         {
           method: "POST"
        }
       );
        if (response.status >= 200 && response.status < 300) {
           alert("authenticated successfully!!!");
        }
        else{
          alert("posted:" + this.state.mcgillid + "  and" + this.state.phoneno);
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
