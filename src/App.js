import React, { Component } from 'react';
import './App.css';
import { fetchWeather } from "./utils/http.js"; 

class App extends Component {

  constructor(props){
    super(props); 
    fetchWeather(37.8267, -122.4233)
  }


  render() {
    return (
    <div>Let's get started with this commute app</div>
    );
  }
}

export default App;
