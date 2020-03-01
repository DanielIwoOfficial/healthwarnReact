import React, {useState,Component} from 'react';
import ReactDOM from 'react';
import './ControlPanel.css';
import NewCaseMap from './NewCaseMap.js'
import Web3 from 'web3'
import registry from './registry.json';

import {Map,Marker,GoogleApiWrapper,InfoWindow} from 'google-maps-react';



const TEST_PROVIDERS={
		"4":""
}	

class ControlPanel extends Component
{
	
	constructor(props)
	{
		super(props);
		this.PMRef=React.createRef();	
	}
	
	NewCase(lg,lat,time,data)
	{
		console.log('New Case!');
		var web3=new Web3(TEST_PROVIDERS['4']);
		var lg=web3.utils.toHex(lg)
		var lat=web3.utils.toHex(lat)
		var time=web3.utils.toHex(time)
		var data=web3.utils.toHex(data)
		var pk='';
		var caddr=registry.networks['4'].address;
		let c=new web3.eth.Contract(registry.abi,caddr);
		var dat=c.methods.NewCase(lg,lat,time,data).encodeABI();	
		web3.eth.sendTransaction({data:dat,to:caddr,gas:100000},(err,th)=>{
			if(err) throw err
			document.getElementById('txhash').innerHTML=th;		
		})	
	}	
	
	render(){
	return(
		<div id="control-panel">
			<script src="https://package.dapphero.io/main.js" id="dh-apiKey" data-api="1582991498491x705444266452189200"></script>
			<div id="entlist">
				<h1>Record a new case</h1>
				<p id={'txhash'}>Locale: United Kingdom   Focus:Anthrax</p>
			</div>
			<div id="div-right">
				<div id="map">
					<NewCaseMap newcase={(lgt,lat,tim,dat)=>{this.NewCase(lgt,lat,tim,dat)}} ref={this.PMRef}/>
				</div>

			</div>
		</div>
	);
	}
}

export default ControlPanel;

