import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  get requestOptions() {
    return {
      method: 'POST',
      body: JSON.stringify({
        nickname: 'vncz'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  componentWillUnmount() {
    this.iframe.removeEventListener('load', this.iframeLoaded);
  }

  requestDataWithHttp = () => {
    fetch('/api/users/Vincenzo', this.requestOptions)
      .then(res => res.json())
      .then(data => this.setState(data))
      .then(undefined, (err) => console.error(err));
  }

  requestDataWithIframe = () => {
    this.channel.port1.postMessage(
      JSON.stringify({
        url: '/api/users/Vincenzo',
        requestOptions: this.requestOptions
      })
    );
  }


  handleIFrameMessage = (e) => {
    this.setState(e.data);
  }

  iframeLoaded = () => {
    this.channel = new MessageChannel();
    this.channel.port1.onmessage = this.handleIFrameMessage;
    this.iframe.contentWindow.postMessage('port', '*', [this.channel.port2]);
  }

  render() {
    return (
      <div className="App">
        <iframe
          src="http://localhost:3001/serve-seed.html"
          height="0"
          width="0"
          frameBorder="0"
          ref={(iframe) => { if (iframe) { this.iframe = iframe; iframe.addEventListener('load', this.iframeLoaded, false); } } }
          >
        </iframe>
        <div className="App-header">
          <img src={logo} className={classNames('App-logo', { 'App-logo--loaded': this.state })} alt="logo" />
          <h2>Hello, I am the Apiary Console</h2>
        </div>
        <p className="App-intro">
          Sit down and try to call the console with our own super server
        </p>
        <button className="App-button" onClick={this.requestDataWithHttp}>Call me with regular Http!</button>
        <button className="App-button" onClick={this.requestDataWithIframe}>Call me using the iframe!</button>

        {this.state &&
          Object.keys(this.state).map((key) => {
            return <pre key={key}>{key}: {this.state[key]}</pre>
          })
        }
      </div>
    );
  }
}

export default App;
