import React, {Component} from 'react'; 
import {Text, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import MapComponent from './Maps/MapComponent';
import LocationPicker from './LocationPicker/LocationPicker';

const {width, height} = Dimensions.get('screen'); 

export default class StudentDash extends Component{
    
    constructor(props){
        super(props);

        this.state={
            
        };
    }

    render(){
        return(
            <View style = {styles.container}>
                <ScrollView 
                    style = {styles.scrollStyle}
                    contentContainerStyle = {styles.scrollContainerStyle}
                    alwaysBounceVertical
                >
                <View style = {styles.mapContainer}>
                    <MapComponent/>
                </View>
                <View style = {styles.locationContainer}>
                   <LocationPicker/>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        flex:0.7, 
        borderColor: 'red'
    },
    scrollStyle:{
        flex: 1,
    },
    scrollContainerStyle: {
    },
    locationContainer: {
        flex: 1, 
        height: height*.3
    }
});