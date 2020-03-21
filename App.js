import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RegisterForm from './src/components/Register/RegisterForm';
import LoginForm from './src/components/Login/LoginForm'
import { createStackNavigator, createAppContainer, HeaderBackButton } from 'react-navigation';
import SplashScreen from './src/components/Splash/SplashScreen';
import StudentDash from './src/components/Dashboard/Student/StudentDash';
import LocationEntry from './src/components/Dashboard/Student/LocationPicker/LocationEntry';
import Globals from './src/components/Globals';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <SplashScreen navigation={this.props.navigation} />
    );
  }
}

class RegisterScreen extends Component {
  static navigationOptions = {
    title: "Registration",
    headerLeft: (
      <HeaderBackButton onPress={() => { alert("No back action yet!") }} />
    ),
  }
  render() {
    return (
      <RegisterForm navigation={this.props.navigation} />
    )
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
    headerLeft: (
      <HeaderBackButton onPress={() => (alert("No back action yet!"))} />
    )
  }
  render() {
    return (
      <LoginForm />
    );
  }
}

class StudentDashboardScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <StudentDash navigation={this.props.navigation} />
    );
  }
}

class LocationEntryScreen extends React.Component {
  static navigationOptions = {
    title: "Enter your location",
    headerLeft: (
      <HeaderBackButton onPress={() => (alert("No back action yet!"))} />
    )
  }
  render(){
    return(
      <LocationEntry/>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Splash: HomeScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
    StudentDash: StudentDashboardScreen,
    LocationEntry:LocationEntryScreen
  },
  {
    initialRouteName: 'Register'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    //Set up all the global variables. 
    Globals(); 
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
