import React from 'react';
import './App.css'
import caduceus from './images/caduceus.png';
function Home(){

	return (
	    <div className="App" backgroundImage={caduceus}>
    		<header className="">
		<img class="main-logo" src={caduceus} height="100px" />
      		<h1><b>HealthWarn</b></h1>
   	   </header>
		<div class="login-div">
			<h2>Login or Browse</h2>
			<div class="login-select">
				<div class="login-option"><p class="login-option-text">Login</p></div>
				<div class="login-option"><p class="login-option-text">Browse</p></div>
			</div>
		</div>      
   	 </div>
	)



}
