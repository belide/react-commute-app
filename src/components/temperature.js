import React, { Component } from 'react';


class TemperatureInput extends Component{
	render(){
		return(

		  <form action="#" onSubmit={this.props.onSubmit} onChange={this.props.onChange}>

		  	<label htmlFor="Min">Min Temperature</label>
		  	<input name="minTemperature" type="text"/>

		  	<label htmlFor="Max">Max Temperature</label>
		  	<input name="maxTemperature" type="text"/>

		  	<label htmlFor="Max">Max Chance Of Rain</label>
		  	<input name="maxRain" type="text"/>

		  	<input type="submit" value="Submit"/>

		  </form>

		); 
	}
}




export default TemperatureInput