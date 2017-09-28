import React, { Component } from 'react';


class TemperatureInput extends Component{




	render(){
		console.log(this.props.morning, this.props.evening); 
		return(

		  <form action="#" onSubmit={this.props.onSubmit} onChange={this.props.onChange}>

		  	<label name="testinput" htmlFor="Min">I can't bike below this temperature</label>
		  	<input name="minTemperature" type="text" required/>
		  	

		  	<label htmlFor="Max">I can't bike above this temperature</label>
		  	<input name="maxTemperature" type="text" required/>

		  	<label htmlFor="Max">I can't bike if chances of rain exceeds</label>
		  	<input name="maxRain" type="text" required/>

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