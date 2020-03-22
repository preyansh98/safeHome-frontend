import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Container, Spinner, Item, Content, Input, Icon, Button, Left, Right, Body, Title } from 'native-base';
import config from '../../config/config';

const { width, height } = Dimensions.get('screen');

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigable: false,
    idtext: '',
    phonetext: '',
    apiData: {
      regAsWlkr: 'false',
      studentorwalker: [
        {
          label: 'Register as a Student!',
          value: 'true'
        },
        {
          label: 'Register as a Walker!',
          value: 'false'
        }
      ]
    },
    input: {
      id: {
        valid: false,
        icon: 'close-circle',
        iconColor: 'red'
      },
      phone: {
        valid: false,
        icon: 'close-circle',
        iconColor: 'red',
      }
    }
  }

  mcgillInputHandler = (text) => {
    this.setState({ idtext: text }, () => {
      this.checkValid("id");
    });
  }

  phoneInputHandler = (text) => {
    this.setState({ phonetext: text }, () => {
      this.checkValid("phone");
    });
  }

  checkValid(type) {
    if (type == "id") {
      let validBool = this.checkMcGillValid(this.state.idtext);
      let newInput = this.state.input;
      if (validBool && !this.state.input.id.valid) {
        newInput.id.valid = true;
        newInput.id.icon = 'checkmark-circle';
        newInput.id.iconColor = 'green';
        this.setState({ input: newInput });
      } else if (!validBool && this.state.input.id.valid) {
        newInput.id.valid = false;
        newInput.id.icon = 'close-circle',
          newInput.id.iconColor = 'red',
          this.setState({ input: newInput });
      }
    } else if (type == "phone") {
      let validBool = this.checkPhoneValid(this.state.phonetext);
      let newInput = this.state.input;
      if (validBool && !this.state.input.phone.valid) {
        newInput.phone.valid = true;
        newInput.phone.icon = 'checkmark-circle';
        newInput.phone.iconColor = 'green';
        this.setState({ input: newInput });
      } else if (!validBool && this.state.input.phone.valid) {
        newInput.phone.valid = false;
        newInput.phone.icon = 'close-circle',
          newInput.phone.iconColor = 'red',
          this.setState({ input: newInput });
      }
    }
  }

  checkMcGillValid(id) {
    return (id.startsWith('260') && id.length == 9 && !isNaN(Number(id)));
  }

  checkPhoneValid(phone) {
    return (!isNaN(Number(phone)) && phone.length == 10);
  }

  bothValid() {
    return (this.state.input.id.valid && this.state.input.phone.valid);
  }

  onPressRadio = studentorwalker => this.setState({ studentorwalker });

  onPressRegisterButton() {
    let selectedButton = this.state.apiData.studentorwalker.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.apiData.studentorwalker[0].value;
    this.makeRegisterCall(selectedButton).then((responseJson) => {
      if (responseJson.status == global.JSON_SUCCESS) {
        //set mcgill id as global.
        global.mcgill_id = this.state.idtext;
      }
    }).then(()=> {
      this.makeLoginCall(selectedButton).then((responseJson) =>{
        if(responseJson.status == global.JSON_SUCCESS){
          this.props.navigation.navigate('StudentDash');
        }
      }).catch(function (error){
        alert(error);
      })
    }).catch(function(error){
      alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Content>
            <View style={styles.inputContainer}>
              <Item success style={styles.input}>
                <Input placeholder='McGill ID' onChangeText={text => this.mcgillInputHandler(text)} returnKeyType='next' />
                <Icon name={this.state.input.id.icon} style={{ color: this.state.input.id.iconColor }} />
              </Item>
              <Item success style={styles.input}>
                <Input placeholder='Phone Number' onChangeText={text => this.phoneInputHandler(text)} returnKeyType='done' />
                <Icon name={this.state.input.phone.icon} style={{ color: this.state.input.phone.iconColor }} />
              </Item>
            </View>
            <View>
              <RadioGroup radioButtons={this.state.apiData.studentorwalker} onPress={this.onPressRadio} />
            </View>
            <View style={styles.buttonContainer}>
              <Button disabled={!this.bothValid()} success style={styles.button} onPress={this.onPressRegisterButton.bind(this)}><Text style={styles.buttontext}>Register!</Text></Button>
            </View>
          </Content>
        </Container>
      </View>
    );
  }

  async makeLoginCall(selectedButton) {
    var data = {
      mcgillID: this.state.idtext,
      loginAsWlkr: !selectedButton
    }
    try {
      let response = await fetch(
        config.backendUrls.loginAPI + "/" + data.mcgillID + "/" + data.loginAsWlkr,
        {
          method: "POST"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let responseJson = await response.json()
        return responseJson;
      }
      else {
        alert("Unsuccesful" + response.status);
      }
    } catch (errors) {
      alert(errors);
    }
  }

  async makeRegisterCall(selectedButton) {
    if (this.bothValid()) {
      var data = {
        mcgillID: this.state.idtext,
        phoneNo: this.state.phonetext,
        regAsWlkr: !selectedButton
      }
    }
    try {
      let response = await fetch(
        config.backendUrls.registerAPI + "/" + data.mcgillID + "/" + data.phoneNo + "/" + data.regAsWlkr,
        {
          method: "POST"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let responseJson = await response.json()
        return responseJson;
      }
      else {
        alert("Unsuccesful" + response.status);
      }
    } catch (errors) {
      alert(errors);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, //to account for header bar.
  },
  inputContainer: {
    paddingTop: 100,
    paddingBottom: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
  },
  buttonContainer: {
    padding: 50
  },
  button: {
    width: width * 0.6,
    alignSelf: 'center',
    justifyContent: 'center'

  },
  buttontext: {
  }
});
