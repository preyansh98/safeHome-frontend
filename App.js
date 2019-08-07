import React,{Component} from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import RegisterForm from './src/components/Register/RegisterForm';
import LoginForm from './src/components/Login/LoginForm'
import {createStackNavigator, createAppContainer,HeaderBackButton} from 'react-navigation';
import SplashScreen from './src/components/Splash/SplashScreen';
import StudentDash from './src/components/Dashboard/Student/StudentDash';

class HomeScreen extends Component{
  static navigationOptions={
    header:null,
  }
  render(){
    return(
      <StudentDash/>
    );
  }
}

class RegisterScreen extends Component{
  static navigationOptions={
    title:"Register",
    headerLeft:(
      <HeaderBackButton onPress={()=>{alert("No back action yet!")}}/>
    ),
  }
  render(){
    return(
      <RegisterForm/>
    )
  }
}

class LoginScreen extends React.Component {
  static navigationOptions={
    title:"Login",
    headerLeft:(
      <HeaderBackButton onPress={()=>(alert("No back action yet!"))}/>
    )
  }
  render() {
    return (
      <LoginForm/>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Splash:HomeScreen,
    Register:RegisterScreen,
    Login:LoginScreen
  },
  {
    initialRouteName:'Splash'
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
