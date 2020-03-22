import React, {Component} from 'react';
import {Text, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import MapComponent from '../../Dashboard/Student/Maps/MapComponent';


const {width, height} = Dimensions.get('screen');

export default class StudentRoute extends Component {

    constructor(props){
        super(props); 
    }

    state = {

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
                    <MapComponent 
                        markers_visible = {true}
                        markers_pickup_lat = {this.props.navigation.getParam('pickup_lat', -1)}
                        markers_pickup_lng = {this.props.navigation.getParam('pickup_lng',-1)}
                        markers_dest_lat = {this.props.navigation.getParam('dest_lat',-1)}
                        markers_dest_lng = {this.props.navigation.getParam('dest_lng',-1)}
                    />
                </View>
                <View style = {styles.locationContainer}>
                   <Text> On the route screen </Text>
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