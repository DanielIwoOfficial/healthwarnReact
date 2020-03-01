import React from 'react';
import ReactDOM from 'react-dom';
import './Home.css'
import './Browser.css'
import caduceus from './images/caduceus.png';
import Browser from './Browser.js'
import ControlPanel from './ControlPanel.js'

function Home(){

	function login()
	{
		//connect to metamask, read  status from smart contract to login
	}

	function openBrowser()
	{
		console.log('open browser')
		ReactDOM.render(<Browser/>,document.getElementsByClassName('App')[0]);
	}

	function openCP()
	{
		ReactDOM.render(<ControlPanel/>,document.getElementsByClassName('App')[0])	
	}

	return ( 
	    <div className="App" backgroundImage={caduceus}>
				
    		<header className="">
		<img class="main-logo" src={caduceus} height="100px" />
      		<h1><b>HealthWarn</b></h1>
		<h4 class="motto">An Ethereum based critical system for disease tracking and medical event reporting</h4>
   	   </header>
		<div class="login-div">
			<h2>Login or Browse</h2>
			<div class="login-select">
				<div class="login-option" onClick={openCP}><p class="login-option-text">Login</p></div>
				<div class="login-option"  onClick={openBrowser}><p class="login-option-text">Browse</p></div>
			</div>
		</div>      
   	 </div>
	);

}

export default Home;
