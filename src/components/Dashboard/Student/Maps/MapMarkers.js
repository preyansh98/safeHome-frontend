import React, {Component} from 'react'; 
import {MapView} from 'expo';

export default class MapMarkers extends Component {

    state = {
        visible: this.visibleHandler()
    }

    visibleHandler(){
        return this.props.visible != null ? this.props.visible : false;
    }

    renderMarkers = () => {
        if(this.state.visible){
        return (
        <MapView.Marker
            coordinate={{latitude: this.props.dest_lat,
                longitude: this.props.dest_lng}}
            title={"Destination"}
            />
        ); 
        } else {
            return (null); 
        }
    }


    render(){
        return(
            this.renderMarkers()
        );
    }
}