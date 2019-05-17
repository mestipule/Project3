import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';



//npm install --save google-maps-react

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
        >
    
        <Marker
        onclick={this.onMarkerClick}
        name={'current location'}
        />
        <InfoWindow 
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
        <div>
          <h4>{this.state.selectedPlace}</h4>
        </div>
        
        </InfoWindow>
      </CurrentLocation>
        
        
        
         
          
          
    );
  }
}

console.log(process.env.REACT_APP_GOOGLE_KEY);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer);


