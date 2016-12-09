import React from 'react';
import ReactDOM from 'react-dom';
import Seed from './Seed';

describe('if I perform a request without the seed', () => {
  const div = document.createElement('div');
  const seed = ReactDOM.render(<Seed scope="apiary" baseUrl="apiary" />, div);

  it('it fails and I get a CHANNEL_NOT_READY error', () => {
    seed.request({}).catch((err) => {
      expect(err.message).toBeDefined();
      expect(err.message).toBe('CHANNEL_NOT_READY');
    });
  });
});
