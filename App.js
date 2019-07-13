import React,{Component} from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import RegisterForm from './src/components/Register/RegisterForm';
import {createStackNavigator, createAppContainer,HeaderBackButton} from 'react-navigation';

class RegisterScreen extends Component{
  static navigationOptions={
    title:"Register",
    headerLeft:(
      <HeaderBackButton onPress={()=>{alert("yoooo this isnt so bad")}}/>
    ),
  }
  render(){
    return(
      <RegisterForm/>
    )
  }
}

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Register:RegisterScreen,
    Login:LoginScreen
  },
  {
    initialRouteName:'Register'
  }
);

const AppContainer=createAppContainer(RootStack);

export default class App extends Component {
  render(){
  return (
      <AppContainer />
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
