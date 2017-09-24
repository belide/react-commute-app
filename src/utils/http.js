//npm install --save axios in terminal before importing
//axios is library for making aysnc http(s) requests 
import axios from "axios"; 
import { DARK_SKY_API_KEY } from "./keys.js"; 

//insert your Dark Sky API key here 


//root URL 
const DARK_SKY_ROOT_URL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast`; 


//function initiates the http request
export function fetchWeather(LAT, LONG){

	//construct the query string
	const url = `${DARK_SKY_ROOT_URL}/${DARK_SKY_API_KEY}/${LAT},${LONG}?exclude=currently,flags,daily,alerts,minutely`; 

	//make the http request and return a promise object
	return axios.get(url); 
}

