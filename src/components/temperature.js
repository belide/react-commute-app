import React, { Component } from 'react';


class TemperatureInput extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	    	maxTemperature: 85, 
	    	minTemperature: 55, 
	    	maxRain: 30, 
	    	morningCommuteStartHour: "8:00",
	    	eveningCommuteStartHour: "17:00"
	    }; 
	    //All the method bindings 
	    this.handleInputChange = this.handleInputChange.bind(this); 
	    this.onFormSubmit = this.onFormSubmit.bind(this); 
	    this.onInputFocus = this.onInputFocus.bind(this); 
	    // this.handleFormSubmit = this.handleFormSubmit.bind(this); 
	    // this.renderCommute = this.renderCommute.bind(this); 
  	}

  	


  	onInputFocus(event){
  		const target = event.target; 
	  	// const value = target.type === "checkbox" ? target.checked : target.value; 
	  	const name = target.name
	  	this.setState({
	  		[name]: ""
	  	})
  	}

  	handleInputChange(event){
	  	const target = event.target; 
	  	const value = target.type === "checkbox" ? target.checked : target.value; 
	  	const name = target.name
	  	this.setState({
	  		[name]: value
	  	})
	}

	onFormSubmit(event){
		event.preventDefault();
		let current = this.state; 
		this.props.onUserInput(current.minTemperature, current.maxTemperature, current.maxRain, current.morningCommuteStartHour, current.eveningCommuteStartHour); 
	}


	render(){
		// console.log(this.props.morning, this.props.evening);
		console.log(this.state);  
		return(

		  <form action="#" onSubmit={this.onFormSubmit} onChange={this.handleInputChange}>

		  	<label name="testinput" htmlFor="Min">I can't bike below this temperature</label>
		  	<input onFocus={this.onInputFocus} name="minTemperature" value={this.state.minTemperature} type="text" required />

		  	<label htmlFor="Max">I can't bike above this temperature</label>
		  	<input onFocus={this.onInputFocus} name="maxTemperature" value={this.state.maxTemperature} type="text" required/>

		  	<label htmlFor="Max">I can't bike if chances of rain exceeds</label>
		  	<input onFocus={this.onInputFocus} name="maxRain" value={this.state.maxRain} type="text" required/>

		  	<label htmlFor="Morning">My Morning Start Hour</label>
		  	<input name="morningCommuteStartHour" type="time"/>

		  	<label htmlFor="Evening">My Evening Start Hour</label>
		  	<input name="eveningCommuteStartHour" type="time"/>

		  	<button type="submit" value="Submit">SUBMIT -></button>

		  </form>

		); 
	}
}




export default TemperatureInput