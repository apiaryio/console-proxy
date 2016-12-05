import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';


let apiBaseUrl = 'http://localhost:3000';
let iframeBaseUrl = 'http://localhost:3001';

if (process.env.NODE_ENV === 'production') {
  apiBaseUrl = 'https://apiarycustomerseed.herokuapp.com';
  iframeBaseUrl = 'https://apiarycustomerseed.herokuapp.com';
}

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
    fetch(`${apiBaseUrl}/api/users/Vincenzo`, this.requestOptions)
      .then(response => {
        let content = null;
        if (response.headers.get('Content-Type').includes('application/json')) {
          content = response.json();
        } else {
          content = response.text();
        }

        return Promise.all([response.headers, content]);
      })
      .then(([headers, body]) => {

        let h = {};

        for (let header of headers) {
          h[header[0]] = header[1];
        }

        this.setState({ headers: h, body });
      })
      .then(undefined, (err) => console.error(err.message || err));
  }

  requestDataWithIframe = () => {
    this.channel.port1.postMessage(
      JSON.stringify({
        url: `${apiBaseUrl}/api/users/Vincenzo`,
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
    this.iframe.contentWindow.postMessage('port', iframeBaseUrl, [this.channel.port2]);
  }

  render() {
    return (
      <div className="App">
        <iframe
          src={`${iframeBaseUrl}/serve-seed.html`}
          height="0"
          width="0"
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin"
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
        <button className="App-button httpCall" onClick={this.requestDataWithHttp}>Call me with regular Http!</button>
        <button className="App-button iframeCall" onClick={this.requestDataWithIframe}>Call me using the iframe!</button>
        {this.state && ['headers', 'body'].map((k) => {
          return (
            typeof(this.state[k]) !== 'string' ?
              <div key={k}>
                <p>{k}: ({Object.keys(this.state[k]).length} elements)</p>
                {this.state[k] && Object.keys(this.state[k]).map((key) => {
                  return <pre className={`detail_${k}`} key={`${k}_${key}`}>{key}: {this.state[k][key]}</pre>
                })}
            </div>
            : <div key={k}><p>{k}</p><pre>{this.state[k]}</pre></div>
          );
        })
        }
      </div>
    );
  }
}

export default App;
