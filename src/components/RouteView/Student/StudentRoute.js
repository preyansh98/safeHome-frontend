import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import MapComponent from '../../Dashboard/Student/Maps/MapComponent';
import WalkerSelector from '../Student/WalkerSelector/WalkerSelector';
import config from '../../../config/config';

const { width, height } = Dimensions.get('screen');

export default class StudentRoute extends Component {

    constructor(props) {
        super(props);
        this.returnCreateReqQueryString = this.returnCreateReqQueryString.bind(this);
        this.makeCreateReqMap = this.makeCreateReqMap.bind(this);
    }

    async componentDidMount() {
        this.setState({ pickup_lat: this.props.navigation.getParam('pickup_lat', -1) });
        this.setState({ pickup_lng: this.props.navigation.getParam('pickup_lng', -1) });
        this.setState({ dest_lat: this.props.navigation.getParam('dest_lat', -1) });
        this.setState({ dest_lng: this.props.navigation.getParam('dest_lng', -1) });
    }

    state = {
        pickup_lat: -1,
        pickup_lng: -1,
        dest_lat: -1,
        dest_lng: -1
    }

    makeCreateReqMap = (selectedWalkerId) => {
        let queryMap = new Map();
        queryMap.set('pickup_lat', this.state.pickup_lat);
        queryMap.set('pickup_long', this.state.pickup_lng);
        queryMap.set('dest_lat', this.state.dest_lat);
        queryMap.set('dest_long', this.state.dest_lng);
        queryMap.set('selectedWalkerId', selectedWalkerId);

        return queryMap;
    }

    returnCreateReqQueryString = (selectedWalkerId) => {
        let queryMap = this.makeCreateReqMap(selectedWalkerId);
        let queryString = "";

        let counter = 0;
        queryMap.forEach((value, key) => {
            (counter++ == 0) ? (queryString += "?" + key + "=" + value) : (queryString += "&" + key + "=" + value);
        });

        return queryString;
    }

    async createRequest(selectedWalkerId) {
        try {
            let response = await fetch(encodeURI(config.backendUrls.createRequestAPI
                + "/"
                + global.mcgill_id
                + this.returnCreateReqQueryString(selectedWalkerId)), { method: "POST" });

            if (response.status >= 200 && response.status < 300) {
                let responseJson = await response.json();
                //move to walker wait flow. 
                alert("Your request was succesfully sent. The corresponding walker will be pinged.");
                return responseJson;
            }
            else {
                alert("Unsuccesful create req" + response.status);
            }
        } catch (errors) {
            alert(errors);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContainerStyle}
                    alwaysBounceVertical
                >
                    <View style={styles.mapContainer}>
                        <MapComponent
                            markers_visible={true}
                            markers_pickup_lat={this.state.pickup_lat}
                            markers_pickup_lng={this.state.pickup_lng}
                            markers_dest_lat={this.state.dest_lat}
                            markers_dest_lng={this.state.dest_lng}
                            navigation = {this.props.navigation}
                        />
                    </View>
                    <View style={styles.locationContainer}>
                        <WalkerSelector
                            createRequest={this.createRequest.bind(this)}
                        />
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
        flex: 0.7,
        borderColor: 'red'
    },
    scrollStyle: {
        flex: 1,
    },
    scrollContainerStyle: {
    },
    locationContainer: {
        flex: 1,
        height: height * .3
    }
}); 