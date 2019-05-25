import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker} from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
Geocode.enableDebug();

class Map extends React.Component {
    constructor (props) {
        super(props);
        console.log("In constructor now", props.intersection);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }, 
            intersection : props.intersection
        }
    }

    componentDidMount() {
        console.log("In componentDidMount now", this.state.intersection);
        if (this.state.state) {
            Geocode.fromAddress(this.state.intersection).then(
                response => {
                    console.log("In componentDidMount response now");
                    console.log(response);
                    if(response.results && response.results.length>0) {
                        var defaultLat = response.results[0].geometry.location.lat;
                        var defaultLong = response.results[0].geometry.location.lng;
                        var address = response.results[0].formatted_address;
                        var addressArray = response.results[0].address_components;
                        var city = this.getCity(addressArray);
                        var area = this.getArea(addressArray);
                        var state = this.getState(addressArray);
                        // console.log('city', city, area, state);
                        
                        this.setState({
                            address: (address) ? address: '',
                            area: (area) ? area: '',
                            city: (city) ? city: '',
                            state: (state) ? state: '',
                            mapPosition: {
                                lat: defaultLat,
                                lng: defaultLong
                            },
                            markerPosition: {
                                lat: defaultLat,
                                lng: defaultLong
                            }, 
                        });
                        // console.log("defaultLat: " + defaultLat + ", defaultLong: " + defaultLong);
                    }
                },
                error => {
                    console.log("Error thrown!!!");
                    console.error(error);
                }
            );
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log('in shouldComponentUpdate: this.state.intersection: ' + this.state.intersection + ', nextProps.intersection: ' + nextProps.intersection);
        if( 
            // this.state.markerPosition.lat !== this.props.center.lat ||
            // this.state.address !== nextState.address ||
            // this.state.city !== nextState.city ||
            // this.state.area !== nextState.area ||
            // this.state.state !== nextState.state || 
            this.state.intersection !== nextProps.intersection
        ) {
            Geocode.fromAddress(nextProps.intersection).then(
                response => {
                    console.log("In shouldComponentUpdate Geocode.fromAddress response now");
                    console.log(response);
                    if(response.results && response.results.length>0) {
                        var defaultLat = response.results[0].geometry.location.lat;
                        var defaultLong = response.results[0].geometry.location.lng;
                        var address = response.results[0].formatted_address;
                        var addressArray = response.results[0].address_components;
                        var city = this.getCity(addressArray);
                        var area = this.getArea(addressArray);
                        var state = this.getState(addressArray);
                        
                        // this.state.address = (address) ? address: '';
                        // this.state.area = (area) ? area: '';
                        // this.state.city = (city) ? city: '';
                        // this.state.state = (state) ? state: '';
                        // this.state.mapPosition = { lat: defaultLat, lng: defaultLong };
                        // this.state.markerPosition = { lat: defaultLat, lng: defaultLong }; 
                        // this.state.intersection = nextProps.intersection;

                        this.setState({
                            address: (address) ? address: '',
                            area: (area) ? area: '',
                            city: (city) ? city: '',
                            state: (state) ? state: '',
                            mapPosition: {
                                lat: defaultLat,
                                lng: defaultLong
                            },
                            markerPosition: {
                                lat: defaultLat,
                                lng: defaultLong
                            }, 
                            intersection: nextProps.intersection
                        });
                    }
                },
                error => {
                    console.log("Error thrown!!!");
                    console.error(error);
                }
            );


            console.log("shouldComponentUpdate: true");
            return true;
        } else {
            console.log("shouldComponentUpdate: false");
            return false;
        }
    }
    getCity = (addressArray) => {
        let city = '';
        if(addressArray) {
            for (let i=0; i<addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                    city = addressArray[i].long_name;
                    return city;
                }
            }
        } else {
            console.log('No city found');
            return city;
        }
    };

    getArea = (addressArray) => {
        let area = '';
        if(addressArray) {
            for (let i=0; i<addressArray.length; i++) {
                if (addressArray[i].types[0]) {
                    for (let j=0; j<addressArray[i].types.length; j++){
                        if ('sublocality_level_1' === addressArray[i].types ||
                        'locality' === addressArray[i].types[j]) {
                            area = addressArray[i].long_name;
                            return area;
                        }
                    }
                }
            }
        } else {
            console.log('No area found');
            return area;
        }
    };

    getState = (addressArray) => {
        let state = '';
        if(addressArray) {
            // console.log("printing addressArray: ");
            // console.log(addressArray);
            for (let i=0; i<addressArray.length; i++) {
                // console.log("Looking at: " + addressArray[i].types[0]);
                if (addressArray[i].types[0] && 'administrative_area_level_1' 
                === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    console.log("State: " + state);
                    return state;
                }
            }
        } else {
            console.log('No state found');
            return state;
        }
    };
    
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    };

    onInfoWindowClos = (event) => {

    };

    onPlaceSelected = (place) => {
        console.log(place);
        const address = place.formatted_address,
        addressArray = place.address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState( addressArray );

        var latValue = this.props.center.lat;
        var lngValue =  this.props.center.lng;
        if(place.geometry) {
            latValue = place.geometry.location.lat();
            lngValue = place.geometry.location.lng();
        }

        this.setState({
            address: (address) ? address: '',
            area: (area) ? area: '',
            city: (city) ? city: '',
            state: (state) ? state: '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };

    onMarkerDragEnd = (event) => {
        console.log('event', event);
        let newLat = event.latLng.lat(),
        newLng = event.latLng.lng(),
        addressArray = [];
    
        Geocode.fromLatLng (newLat,newLng, addressArray).then(
            response => {
                const address = response.results[0].formatted_address,
                addressArray = response.results[0].address_components,
                city = this.getCity(addressArray),
                area = this.getArea(addressArray),
                state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address: '',
                    area: ( area ) ? area : '',
                    city: (city) ? city: '',
                    state: (state) ? state: ''
                })
            },
            error => {
                console.error(error);
            }
        );
    };
    

    // onMarkerClick = (props, marker, e) => {
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    // };


    render() {
        console.log("we are in render: " + this.state.intersection);
        const AsyncMap = withScriptjs (
            withGoogleMap(
                props => (
                    <GoogleMap 
                        google = {this.props.google}
                        defaultZoom = {this.props.zoom}
                        defaultCenter = {{ lat: this.state.mapPosition.lat, 
                            lng: this.state.mapPosition.lng}}
                        defaultOptions = {{
                            disableDefaultUI: true,
                            scaleControl: true,
                            scrollwheel: true,
                            
                        }}
                            >
                        {/**<Autocomplete
                            style = {{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottome: '100px'
                            }}
                            onPlaceSelected = {this.onPlaceSelected}
                            types = {['(regions)']}
                            />
                        */}
                        <Marker google={this.props.google}
                            name={'Dupont Circle'}
                                draggable = {false}
                                //onDragEnd = {this.onMarkerDragEnd}
                                // onClick={this.onMarkerClick}
                                position = {{lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
                        />
                        <InfoWindow
                            onClose = {this.onInfoWindowClose}
                            position = {{lat:(this.state.markerPosition.lat + 0.0018), 
                            lng: this.state.markerPosition.lng}}
                            >
                            <div>
                            <span style= {{ padding: 0, margin: 0}}>{this.state.address}</span>
                             </div>
                            </InfoWindow>
                        
                       
                    </GoogleMap>
                )
            )
        );
        
     
        let map;
            if (this.props.center.lat !== undefined) {
                map = <div>
                <div>
                    <div className="formGroup">
                        <label htmlFor=''>City</label>
                        <input type="text" name="city" className="controlForm" onChange={
                            this.onChange} readOnly="readOnly" value={this.state.city}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor=''>Area</label>
                        <input type="text" name="area" className="controlForm" onChange={
                            this.onChange} readOnly="readOnly" value={this.state.area}/>
                     </div>
                     <div className="formGroup">
                        <label htmlFor=''>State</label>
                        <input type="text" name="state" className="controlForm" onChange={
                            this.onChange} readOnly="readOnly" value={this.state.state}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor=''>Address</label>
                        <input type="text" name="address" className="controlForm" onChange={
                            this.onChange} readOnly="readOnly" value={this.state.address}/>
                     </div>
                </div>
                    <AsyncMap
                        googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHruTXgtljtftWHl2-fL1ab6S4TE7nZ4U&libraries=places"
                        loadingElement = {
                            <div style = {{height: '100%'}}/>
                        }
                        containerElement = {
                            <div style = {{height: this.props.height}}/>
                        }
                        mapElement={
                            <div style = {{height: '100%'}}/>
                        }
                    />
                </div> 
            } else { 
                map = <div style = {{height:this.props.height}}/>
            }
            return (map)
    }
}

/** 
 * How to use
class NewCompo extends Component {
    render() {
      return(
          <Map
       google={this.props.google}
       center={{lat: 18.5204, lng: 73.8567}}
       height='300px'
       zoom={15}
      />
        )
    }
  }
  */
export default Map