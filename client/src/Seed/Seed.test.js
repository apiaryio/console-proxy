import React from 'react';
import ReactDOM from 'react-dom';
import Seed from './Seed';

import http from 'http';
import fs from 'fs';

const server = require('../../../index');
const s2 = http.createServer((req, res) => {
  file = fs.readFileSync('../public/apiary-customer-seed.js', 'utf8')
  res.writeHead(200);
  res.write(file, 'utf8');
  res.end();
});

server.start();
const ensureChannelNotReadyError = (seed) => {
  it('and if I try to call request something I get a CHANNEL_NOT_READY error', () => {
    return seed.request({}).then(undefined, (err) => {
      expect(err.message).toBeDefined();
      expect(err.message).toBe('CHANNEL_NOT_READY');
      expect(seed.channel).toBeUndefined();
    });
  });
}

describe('if I perform a request with an non existend seed page', () => {
  const div = document.createElement('div');
  const seed = ReactDOM.render(<Seed scope="apiary" debugOutput={true} seedUrl="https://apiary.xyz" />, div);

  ensureChannelNotReadyError(seed);
});

describe('if I try to create a seed with invalid origin', () => {
  const div = document.createElement('div');
  const seed = ReactDOM.render(<Seed scope="apiary" debugOutput={true} seedUrl="http://localhost:3001/serve-seed.html" origin="invalidOrigin" />, div);

  ensureChannelNotReadyError(seed);
});

describe('Nasino pariosino', () => {
  const div = document.createElement('div');
  const seed = ReactDOM.render(<Seed scope="apiary" seedUrl="http://localhost:3001/serve-seed.html" origin="*" />, div);

  ensureChannelNotReadyError(seed);
});
