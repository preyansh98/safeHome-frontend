import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

export default class MapMarkers extends Component {

    state = {
        visible: this.props.visible
    }

    renderMarkers = () => {
        if (this.state.visible) {
            return (
                <View>
                    <MapView.Marker
                        identifier={'mk1'}
                        coordinate={{
                            latitude: this.props.pickup_lat,
                            longitude: this.props.pickup_lng
                        }}
                        title={"Pickup"}
                    />
                    <MapView.Marker
                        identifier={'mk2'}
                        coordinate={{
                            latitude: this.props.dest_lat,
                            longitude: this.props.dest_lng
                        }}
                        title={"Destination"}
                    />
                </View>
            );
        } else {
            return (null);
        }
    }


    render() {
        return (
            this.renderMarkers()
        );
    }
}