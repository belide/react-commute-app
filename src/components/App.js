import React, { Component } from 'react';
import TemperatureInput from "./temperature.js"; 
import { fetchWeather } from "../utils/http.js"; 
import { timeStampToDate } from  "../utils/helper.js"; 


class App extends Component {

	constructor(props){
	    super(props);
	    this.state = {
	    	morningCommuteStartHour: "8:00",
	    	eveningCommuteStartHour: "17:00"
	    }; 
	    //All the method bindings 
	    this.handleInputChange = this.handleInputChange.bind(this); 
	    this.handleFormSubmit = this.handleFormSubmit.bind(this); 
	    this.renderCommute = this.renderCommute.bind(this); 
  	}


	handleInputChange(event){
	  	const target = event.target; 
	  	const value = target.type === "checkbox" ? target.checked : target.value; 
	  	const name = target.name
	  	this.setState({
	  		[name]: value
	  	})
	}


	handleFormSubmit(event){
	  	//prevent forwarding the form submission to the server

	  	event.preventDefault(); 
	  	console.log(this.state); 

	  	//get the data from browser navigator
	  	if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition((position) => {

	        	console.log(position); 

	        	//initiate AJAX with LAT and LONG of the users location
	        	fetchWeather(position.coords.latitude, position.coords.longitude)

	        		//here comes the promise chain

	        		//this block filters the incoming data into the 
	        		//commute time window 8-9am and 5-6pm
	        	    .then((obj) => {
	        	      console.log(obj); 
				      return obj.data.hourly.data.filter((elm) => {
					  const time = new Date(elm.time*1000).getHours(); 
					  if(time === parseInt(this.state.morningCommuteStartHour.split(":")[0]) || time === parseInt(this.state.eveningCommuteStartHour.split(":")[0])){
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
				    		if(elm.temperature > this.state.minTemperature && elm.temperature < this.state.maxTemperature && elm.precipProbability*1000 < this.state.maxRain){
				    			elm.commute = "bike"; 
				    		} else{
				    			elm.commute = "metro"; 
				    		}
				    		return elm; 
				    	})

				    })

				    //set the state and re-renders the App component
				    .then((data) =>{
				    	console.log(data); 
				    	this.setState({
				    		commuteDetails: data
				    	}) 

				    })

				    //catch any error in the promise chain
				    .catch(function(err){
				       console.log(err); 
					})

				})

	        };   
	}

	//conditional render depending on the state
	renderCommute(){
		if(this.state.commuteDetails){
			console.log("state has commuteDetails property"); 
			return this.state.commuteDetails.map((elm) => <div key={elm.time}>Please take a {elm.commute}</div>)
		} else {
			console.log("state does not have commuteDetails property")
			return <div className="placeholder"></div>
		}
	}


	render() {
		console.log(this.state); 
	    return (
	    	<div className="app">
	    	    <h1>COMMUTELY</h1>
		    	<TemperatureInput 
		    		onSubmit={this.handleFormSubmit} 
		    		onChange={this.handleInputChange}
		    	/>
		    	{this.renderCommute()}
	    	</div>
	    );
	}

}

export default App;
