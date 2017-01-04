import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Seed from '../Seed/Seed';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    axios.defaults.baseURL = props.params.baseUrl;
    axios.defaults.validateStatus = () => true;
  }

  get requestOptions() {
    return {
      url: '/api/users/Vincenzo',
      method: 'POST',
      data: {
        nickname: 'vncz'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  requestDataWithHttp = () => {
    axios(this.requestOptions)
      .then((response) => this.setState({ headers: response.headers, body: response.data }))
      .then(undefined, (err) => console.error(err.message || err));
  }

  requestDataWithSeed = () => {
    this.Seed.request(this.requestOptions)
      .then((data) => this.setState(data))
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <Seed
          ref={(s) => { this.Seed = s } }
          seedUrl={`${this.props.params.baseUrl}/serve-seed.html`}
          scope="apiary-console"
          onReady={() => { console.info('Seed is ready to communicate'); } }
          debugOutput={true}
          />
        <div className="App-header">
          <img src={logo} className={classNames('App-logo', { 'App-logo--loaded': this.state })} alt="logo" />
          <h2>Hello, I am the Apiary Console</h2>
        </div>
        <p className="App-intro">
          Sit down and try to call the console with our own super server
        </p>
        <button className="App-button httpCall" onClick={this.requestDataWithHttp}>Call me with regular Http!</button>
        <button className="App-button iframeCall" onClick={this.requestDataWithSeed}>Call me using the Seed component!</button>
        {this.state && ['headers', 'body'].map((k) => {
          return (
            typeof (this.state[k]) !== 'string' ?
              <div key={k}>
                <p>{k}: (Elements: {Object.keys(this.state[k]).length})</p>
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
