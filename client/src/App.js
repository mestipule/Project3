import React, {Component} from 'react';
import Map from './components/Map/Map';

class App extends Component {

    render() {
        return(
            <div style={{ margin: '100px'}}>
            <Map
            google={this.props.google}
            center={{lat: 38.9095559, lng: -77.0430325}}
            height='300px'
            zoom={15}
            />
            </div>
            
        );
    }
}

export default App;
