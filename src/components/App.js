import React, { Component } from 'react';
import TemperatureInput from "./temperature.js"; 
import { fetchWeather } from "../utils/http.js"; 
// import { timeStampToDate } from  "../utils/helper.js"; 


class App extends Component {

	constructor(props){
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state ={};  
	}



	handleFormSubmit(minTemp, maxTemp, maxRain, morningCommuteStartHour, eveningCommuteStartHour){
	  	//prevent forwarding the form submission to the server
	  	console.log(typeof minTemp, typeof maxTemp, typeof maxRain, morningCommuteStartHour, eveningCommuteStartHour); 
	  	
	  	if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((position) => {

				fetchWeather(position.coords.latitude, position.coords.longitude)
	    			.then((obj) => {
				      return obj.data.hourly.data.filter((elm) => {
					  const time = new Date(elm.time*1000).getHours(); 
					  if(time === parseInt(morningCommuteStartHour.split(":")[0]) || time === parseInt(eveningCommuteStartHour.split(":")[0])){
						return true; 
					  } else{
						return false; 
					  }	
					 })
					})
			//assign the commute option depending on the users preferences
					.then((data) => {
				    console.log(data); 
				     return data.map((elm) => {
				    	if(elm.temperature > minTemp && elm.temperature < maxTemp && elm.precipProbability*1000 < maxRain){
				    		elm.commute = "bike"; 
				    	} else{
				    		elm.commute = "metro"; 
				    	}
				    		return elm; 
				    	})
					})

				    //set the state and re-renders the App component
					.then((data) =>{
						this.setState({
				    	commuteDetails: data
						}) 
					})
				    //catch any error in the promise chain
					.catch(function(err){
				       console.log(err); 
					})

			})
		}
	}
	
	// conditional render depending on the state
	renderCommute(){
		if(this.state.commuteDetails){
			console.log("state has commuteDetails property"); 
			return this.state.commuteDetails.map((elm) => <div key={elm.time}>Please take a {elm.commute}</div>)
		} else {
			console.log("state does not have commuteDetails property")
			return null; 
		}
	}


	render() {
		console.log(this.state); 
	    return (
	    	<div className="app">
	    	    <h1>COMMUTELY</h1>
		    	<TemperatureInput 
		    		onUserInput={this.handleFormSubmit} 
		    	/>
		    	{this.renderCommute()}
	    	</div>
	    );
	}

}

export default App;
