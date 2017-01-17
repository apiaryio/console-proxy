import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../../Seed';

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

function checkResponseData(res) {
  expect(res.data).toBeDefined();
  expect(res.headers).toBeDefined();
  /*
    Yeah ok not a great test, but it's an easy way to understand if we
    were able to overcome the CORS limitations
  */
  expect(res.headers['x-powered-by']).toBeDefined();
  expect(res.status).toBe(200);
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

  describe('seed with everything set (Chrome)', () => {

    beforeAll((done) => {
      seed = ReactDOM.render(<Seed onReady={done} seedUrl="ijlncpebbpeeagehccegnddhhdgcaflf"/>,
        document.getElementById('container')
      );
    });

    it('valid http request', (done) => {
      const options = getRequestOptions();
      options.url = 'http://localhost:3001' + options.url;
      return seed.request(options).then((res) => {
        checkResponseData(res);
        done()
      }, done.fail.bind(this, new Error('This promise should not have been rejected')));
    });

  });

});

