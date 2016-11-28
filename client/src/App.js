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
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={this.handleClick}>Fetch me</button>
        </p>
      </div>
    );
  }
}

export default App;
