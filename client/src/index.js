import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './App';
import './index.css';

const getBaseUrl = () => {
  let baseUrl = 'http://localhost:3001';
  if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://apiarycustomerseed.herokuapp.com';
  } else if (process.env.NODE_ENV === 'CI') {
    baseUrl = 'https://api.xyz.com:3001';
  }
  return baseUrl;
};

ReactDOM.render(
  (<BrowserRouter>
    <div>
      <Match pattern="/:baseUrl" component={App} />
      <Miss component={() => {
        return <App params={{
          baseUrl: getBaseUrl()
      }}/>
      }}/>
    </div>
  </BrowserRouter>),
  document.getElementById('root')
);


