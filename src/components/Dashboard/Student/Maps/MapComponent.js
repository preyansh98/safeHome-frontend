import React, { Component } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { GMAPS_API_KEY } from 'react-native-dotenv';
import MapMarkers from './MapMarkers';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('screen');

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: 45.5060749,
  longitude: -73.5758494,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
  }

  map = null;

  state = {
    region: initialRegion,
    ready: false,
  };

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region, 1000), 10);
    }
  }

  async componentDidMount() {
    await this.getCurrentPosition();
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setRegion(region);
      },
        (error) => {
          Alert.alert("", "Sorry, an error was encountered in getting your location");
        });
    } catch (e) {
      Alert.alert(e.message || "");
    }
  };

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ ready: true });
    }
  };

  renderPolygon = () => {
    if (this.props.markers_visible) {
      return (
        <MapViewDirections
          origin = {this.props.markers_pickup_lat + "," + this.props.markers_pickup_lng}
          destination = {this.props.markers_dest_lat + "," + this.props.markers_dest_lng}
          apikey = {GMAPS_API_KEY}
          mode = "WALKING"
          strokeWidth={3}
          strokeColor="blue"
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <MapView
            ref={map => { this.map = map }}
            onMapReady={this.onMapReady}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={false}
            style={{ flex: 1, height: height * 0.7, width }}
          >
            <MapMarkers
              visible={this.props.markers_visible != null ? this.props.markers_visible : false}
              pickup_lat={this.props.markers_pickup_lat != null ? this.props.markers_pickup_lat : -1}
              pickup_lng={this.props.markers_pickup_lng != null ? this.props.markers_pickup_lng : -1}
              dest_lat={this.props.markers_dest_lat != null ? this.props.markers_dest_lat : -1}
              dest_lng={this.props.markers_dest_lng != null ? this.props.markers_dest_lng : -1} />

            {this.renderPolygon()}

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
  contentContainer: {
  }
});