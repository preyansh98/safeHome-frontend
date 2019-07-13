import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Button} from 'react-native';
import {MapView} from 'expo';

export default class MapComponent extends Component{
    constructor(props){
        super(props);

        this.state={
            region: null
        };

        findCoordinates = () => {
            navigator.geolocation.getCurrentPosition(
              position => {
                const location = JSON.stringify(position);
        
                this.setState({ region : location });
              },
              error => Alert.alert(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          };
    }
    
    render(){
        
        return(
            <View style = {styles.container}>
                <Text>what it do</Text>
                <MapView
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    showsCompass={true}
                    rotateEnabled={false}
                    style={{flex:1}}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });