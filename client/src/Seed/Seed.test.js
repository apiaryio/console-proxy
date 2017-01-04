jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

import fs from 'fs';
import http from 'http';
import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom';
import Seed from './Seed';

const server = require('../../../index');
let seedServer = null;

const ensureChannelNotReadyError = (seed) => {
  it('and if I try to call request something I get a CHANNEL_NOT_READY error', () => {
    return seed.request({}).then(undefined, (err) => {
      expect(err.message).toBeDefined();
      expect(err.message).toBe('CHANNEL_NOT_READY');
      expect(seed.channel).toBeUndefined();
    });
  });
}

beforeAll((done) => {
  seedServer = http.createServer((req, res) => {
    const seedFile = fs.readFileSync(path.join(__dirname, '../../public/apiary-customer-seed.js'), 'utf8');
    res.writeHead(200, {
      'Content-Type': 'application/javascript'
    });
    res.write(seedFile, 'utf8');
    res.end();
  }).listen(3000, 'localhost');
  server.start(done);
});

afterAll((done) => {
  setTimeout(() => {
    server.stop(() => {
      seedServer.close();
      done()
    })
  }, 10000);
});

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
