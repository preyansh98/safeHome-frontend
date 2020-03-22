import React, {Component} from 'react';
import {StyleSheet,View,Alert,Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import MapMarkers from './MapMarkers';

const {width, height} = Dimensions.get('screen'); 

const LATITUDE_DELTA = 0.01; 
const LONGITUDE_DELTA = 0.01; 

const initialRegion = {
  latitude: 37.78812,
  longitude: -120.93142, 
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default class MapComponent extends Component{
    constructor(props){
        super(props);
    }
    
    map = null; 

    state={
            region: initialRegion, 
            ready: false,
          };

    setRegion(region){
      if(this.state.ready){
      setTimeout(() => this.map.animateToRegion(region,1000), 10);
      }
    }
    
    componentDidMount(){
      this.getCurrentPosition(); 
    }

    getCurrentPosition(){
      try{
        navigator.geolocation.getCurrentPosition((position) => {
          const region = {
            latitude : position.coords.latitude, 
            longitude: position.coords.longitude, 
            latitudeDelta: LATITUDE_DELTA, 
            longitudeDelta: LONGITUDE_DELTA
          }; 
          this.setRegion(region);
        },
       (error) =>{
          Alert.alert("", "Sorry, an error was encountered in getting your location"); 
      }); 
    } catch(e){
        Alert.alert(e.message || ""); 
    }
  };
       
  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  };



    render(){
        const { region } = this.state;

        return(
            <View style = {styles.container}>
                <View style = {{flex:1}}>
                <MapView
                    ref={ map => { this.map = map }}
                    onMapReady = {this.onMapReady}
                    provider = {MapView.PROVIDER_GOOGLE}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    showsCompass={true}
                    rotateEnabled={false}
                    style={{flex:1, height : height*0.7, width}}
                >
                  <MapMarkers 
                    visible = {this.props.markers_visible != null ? this.props.markers_visible : false}
                    dest_lat = {this.props.markers_dest_lat != null ? this.props.markers_dest_lat : ""}
                    dest_lng = {this.props.markers_dest_lng != null ? this.props.markers_dest_lng : ""}/>
                  </MapView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }, 
    contentContainer:{
    }
  });