import React, {useState,Component} from 'react';
import ReactDOM from 'react-dom';
import PointsMap from './PointsMap.js'
import Web3 from 'web3';
import './Browser.css'

import {Map,Marker,GoogleApiWrapper,InfoWindow} from 'google-maps-react';



import registry from './registry.json';

const TEST_PROVIDERS={
		"4":"https://rinkeby.infura.io/v3/2c499aed715a47f5bb77ef88afc5f27d"
}

const NETWORK_ID='4'

class Browser extends Component
{
	
	constructor(props)
	{
		super(props);	
		this.state={};
		this.PMRef=React.createRef();
	
	}

	
	displayPoints(map)
	{
	console.log(registry.networks[NETWORK_ID].address);
	var w3=new Web3(TEST_PROVIDERS['4']);
	console.log(w3);
	var c=new w3.eth.Contract(registry.abi,registry.networks[NETWORK_ID].address);
	console.log(c);
	c.getPastEvents('NewCase',{fromBlock:6060000},(err,e)=>{
		if(err) throw err;
		var cds=this.getCds(e)		;
		const pm=this.PMRef.current;
		pm.setState({lat:cds[cds.length-1].latitude,long:cds[cds.length-1].longitude})		
		
		var m=new Marker;		
		m.state={lat:0,lng:80};
		console.log(pm.props.children)
		console.log(cds);	
	})	
	}
	
	 getCds(evts)
	{
		var i;
		var cds=[];
		for(i=0;i<evts.length;i++)
		{
			cds[i]=new Object;
			cds[i].longitude=parseInt(evts[i].returnValues.longitude);	
			cds[i].latitude=parseInt(evts[i].returnValues.latitude);		
			cds[i].time=parseInt(evts[i].returnValues.time);	
			cds[i].data=evts[i].returnValues.data;	
		}	
		return cds;
	}
	
	 displayMap()
	{
		var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
		mapboxgl.accessToken = 'pk.eyJ1IjoiaGVhbHRod2FybiIsImEiOiJjazc4anRjeGQwZ3Y4M25wamlkcnVrempqIn0.fVXtmAr0urvfkSG12SLh5w';
		var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11'
		});	
	}
	
	 refreshMap()
	{
	//	ReactDOM.render(<PointsMap/>,document.getElementsByClassName('map')[0]);	
	}

	
	render(){
	return(
		
		<div class="Browser" className="Browser">
		<script type="text/Javascript" src="https://raw.githubusercontent.com/ethereum/web3.js/1.x/dist/web3.min.js"></script>
		<script src='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js'></script>
		<link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />
		
			<div class="header">
				<h1>HealthWarn Browser</h1>
			</div>
			<div id="browser-wrap">
			<div class="dash-div side-nav">
				<div class="dash-div filter-div">
					<button onClick={this.displayPoints('main-map')}>Refresh</button>
				</div>
				<div class="dash-div list-event-div">
	
				</div>
			</div>
			<div class="dash-div main-div">
				<div className="map-div" class="dash-div map-div">
					<PointsMap ref={this.PMRef}/>
				</div>
				<div class="dash-div act-div">

				</div>
			</div>
			</div>
			<script type="text/Javascript" language="Javascript">
	
			
			</script>
		</div>
	);}
}

export default Browser;
