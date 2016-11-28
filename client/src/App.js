import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleClick() {
    fetch('/api/data1')
      .then(res => res.json())
      .then(data => console.log(data))
      .then(undefined, (err) => console.error(err));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello, I am the Apiary Console</h2>
        </div>
        <p className="App-intro">
          Sit down and try to call the console with our own super server
        </p>
        <button className="App-button">Call me maybe!</button>
      </div>
    );
  }
}

export default App;
