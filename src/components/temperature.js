import React, { Component } from 'react';


class TemperatureInput extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	    	maxTemperature: {value: 85, isValid: true}, 
	    	minTemperature: {value: 55, isValid: true}, 
	    	maxRain: {value: 30, isValid: true},
	    	morningCommuteStartHour: {value: "8:00", isValid: true}, 
	    	eveningCommuteStartHour: {value: "17:00", isValid: true}, 
	    	hasError: false
	    }; 
	    //All the method bindings 
	    this.handleInputChange = this.handleInputChange.bind(this); 
	    this.onFormSubmit = this.onFormSubmit.bind(this); 
	    this.onInputFocus = this.onInputFocus.bind(this); 
	    this.renderInputError = this.renderInputError.bind(this); 
	    this.renderFormError = this.renderFormError.bind(this); 
  	}


    //when user focuses on the input field 
  	onInputFocus(event){
  		const targetName = event.target.name; 
  		const value = event.target.value
  		if(value !== ""){
  			this.setState({
	  		...this.state, 
	  		[targetName]: {value: "", isValid: false} 
	  	    })
  		} else return; 
  	}


    //when value of the input changes
  	handleInputChange(event){
	  	const target = event.target; 
	  	const value = target.type === "checkbox" ? target.checked : target.value.trim(); 
	  	const name = target.name
	  	const search = value.search(/\D+/); 
	  	if(search === -1 && value !== ""){
	  		return this.setState({
	  			...this.state, 
	  			[name]: {value, isValid: true}, 
	  			hasError: false
	  		}); 
	  	} else{
		  	return this.setState({
		  		...this.state, 
		  		[name]: {value, isValid: false}, 
		  	}); 
	  	}
	}



	onFormSubmit(event){
	    event.preventDefault();
	    let current = this.state; 
	    const arr = []; 
		for(let i in current){
			arr.push(current[i].isValid); 
		}
		if(!arr.includes(false)){
			this.props.onUserInput(current.minTemperature.value, current.maxTemperature.value, current.maxRain.value, current.morningCommuteStartHour.value, current.eveningCommuteStartHour.value);	
		} else{
			this.setState({
			    ...current, 
			    hasError: true
			 }); 
			}
		}


	//alert incase of from input validation errors
	renderInputError(name){
		if(this.state[name].isValid === false){
			return <div className="error">Field cannot be empty or accept non-integer values</div>; 
		} else{
			return null; 
		}
	}


	renderFormError(){
		if(this.state.hasError === true){
			return <div className="error">Please correct errors above before submitting</div>
		} else{
			return null; 
		}
	}


	render(){
		console.log(this.state); 
		return(

		  <form action="#" onSubmit={this.onFormSubmit} onChange={this.handleInputChange}>

		  	<label name="testinput" htmlFor="Min">I can't bike below this temperature(in F)<b>*</b></label>
		  	<input onFocus={this.onInputFocus} name="minTemperature" value={this.state.minTemperature.value} type="text" />
		  	{this.renderInputError("minTemperature")}

		  	<label htmlFor="Max">I can't bike above this temperature(in F)<b>*</b></label>
		  	<input onFocus={this.onInputFocus} name="maxTemperature" value={this.state.maxTemperature.value} type="text"/>
		  	{this.renderInputError("maxTemperature")}

		  	<label htmlFor="Max">I can't bike if chances of rain exceeds(in Percentage)<b>*</b></label>
		  	<input onFocus={this.onInputFocus} name="maxRain" value={this.state.maxRain.value} type="text"/>
		  	{this.renderInputError("maxRain")}

		  	<label htmlFor="Morning">My Morning Start Hour<b>*</b></label>
		  	<input name="morningCommuteStartHour" type="time"/>

		  	<label htmlFor="Evening">My Evening Start Hour<b>*</b></label>
		  	<input name="eveningCommuteStartHour" type="time"/>

		  	<button type="submit" value="Submit">SUBMIT -></button>
		  	{this.renderFormError()}

		  </form>

		); 
	}
}




export default TemperatureInput