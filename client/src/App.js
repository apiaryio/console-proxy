import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleClick = () => {
    fetch('/api/users/Vincenzo')
      .then(res => res.json())
      .then(data => this.setState(data))
      .then(undefined, (err) => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className={classNames('App-logo', {'App-logo--loaded': this.state})} alt="logo" />
          <h2>Hello, I am the Apiary Console</h2>
        </div>
        <p className="App-intro">
          Sit down and try to call the console with our own super server
        </p>
        <button className="App-button" onClick={this.handleClick}>Call me maybe!</button>

        {this.state &&
          Object.keys(this.state).map((key) => {
            return <p><pre>{key}: {this.state[key]}</pre></p>
          })
        }
      </div>
    );
  }
}

export default App;
