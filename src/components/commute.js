import React from 'react';
import { timeStampToDate } from "../utils/helper.js"


//time, commute, key
const Commute = (props) => {
	//convert props.time into Name of the day + time
	if (props.commute === "metro"){
		return(
			<div className="commute">
				<div>{timeStampToDate(props.time*1000)}</div>
				<i className="fa fa-subway" aria-hidden="true"></i>		
			</div>
		); 
	} else {
		return(
			<div className="commute">
				<div>{timeStampToDate(props.time*1000)}</div>
				<i className="fa fa-bicycle" aria-hidden="true"></i>
			</div>
		); 
	}
	
}



export default Commute; 


