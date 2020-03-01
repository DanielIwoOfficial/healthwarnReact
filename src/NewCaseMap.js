import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';



const mapStyles = {
    width: '100%',
    height: '100%',
  };
const buttonStyle = {
    width: '100px',
    height: '40px',
    title: 'Accept',

};


class NewCaseMap extends Component {

    constructor(props) {
        super(props);
        this.PMRef=React.createRef();
        this.state = {
           	 lat: 0.0,
            lng: 0.0, 
            opac: 0.0,
            ShowingInfoWindow: false,
            InfoWindowLat:0.0,
            InfoWindowLng: 0.0,
            InfoWindowContent1: 'Latitude',
            InfoWindowContent2: 'Longitude', 
        };  
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick(ignored, ignored2, wanted) {
    		var ifwlat=wanted.latLng.lat()+0.2;
        this.setState({lat: wanted.latLng.lat(), lng: wanted.latLng.lng(), opac:1.0,ShowingInfoWindow:true,InfoWindowLat:ifwlat,InfoWindowLng:wanted.latLng.lng()})
    }

	submit()
	{
		console.log('hello');	
		//this.props.newcase(this.state.lng,this.state.lat,0,document.getElementById('caseinfo').value);
	}

  render() {    
    return (
        <Map ref={this.PMRef}
          google={this.props.google}
          zoom={7}
          style={mapStyles}
          initialCenter={{lat: 51.507, lng: -0.128}}
          onClick={this.handleClick} 
        >
         <Marker 
         position={{
            lat: this.state.lat,
            lng: this.state.lng,
          }}
          opacity = {this.state.opac}
        />
        <InfoWindow
            position={{
                lat: this.state.InfoWindowLat,
                lng: this.state.InfoWindowLng,
              }}
            visible = {this.state.ShowingInfoWindow}>
            <div>
            	<h1>New Case:</h1>
              <h2>{this.state.InfoWindowContent1},{this.state.lat}</h2>
              <h2>{this.state.InfoWindowContent2},{this.state.lng}</h2>
              <input id={'caseinfo'} placeholder="info"/>
              <button
              onClick={this.submit}>Record
              </button>
            </div>
            </InfoWindow>
			
        </Map>
    );



  }
};
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyCIHslKX9KOr_UspTRbVHwgnR8qSG2LHQM'
  })(NewCaseMap);