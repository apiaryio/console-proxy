import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../Seed';

const ensureChannelNotReadyError = (seed) => {

  it('try to call request something I get a CHANNEL_NOT_READY error', (done) => {
    seed().request({}).then(done.fail.bind(this, 'This promise should not have been resolved'), (err) => {
      expect(err.message).toBeDefined();
      expect(err.message).toBe('CHANNEL_NOT_READY');
      expect(seed.channel).toBeUndefined();
      done();
    });
  });
}

function getRequestOptions() {
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

describe('Component interface test', () => {
  let seed = undefined;

  beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
  });


  describe('request with a non existent seed page', () => {
    beforeAll(() => {
      seed = ReactDOM.render(<Seed
        scope="apiary"
        seedUrl="https://apiary.xyz"
        />, document.getElementById('container'));
    })

    ensureChannelNotReadyError(() => seed);

  });

  describe('seed with invalid origin', () => {
    beforeAll(() => {
      seed = ReactDOM.render(<Seed
        scope="apiary"
        seedUrl="http://localhost:3001/serve-seed.html"
        origin="invalidOrigin"
        />, document.getElementById('container'));
    });

    ensureChannelNotReadyError(() => seed);

  });

  describe('seed with a non matching scope', () => {
    beforeAll(() => {
      seed = ReactDOM.render(<Seed
        scope="apiary"
        seedUrl="http://localhost:3001/serve-seed.html"
        origin="*"
        />, document.getElementById('container'));
    });

    ensureChannelNotReadyError(() => seed);

  });

  describe('seed with everything set', () => {

    beforeAll((done) => {
      seed = ReactDOM.render(<Seed
        scope="apiary-console"
        seedUrl="http://localhost:3001/serve-seed.html"
        origin="*"
        onReady={done}
        />, document.getElementById('container'));
    });

    it('valid http request', (done) => {
      return seed.request(getRequestOptions()).then((res) => {
        expect(res.data).toBeDefined();
        expect(res.headers).toBeDefined();
        expect(res.status).toBe(200);
        done()
      }, done);
    });

  });
});

