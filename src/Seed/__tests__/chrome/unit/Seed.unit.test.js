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
  let containerElement = undefined;

  beforeAll(() => {
    containerElement = document.createElement('div');
    containerElement.setAttribute('id', 'container');
    document.body.appendChild(containerElement);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(containerElement);
  });

  describe('seed with non installed extension', () => {
    let _err = undefined;

    beforeAll((done) => {
      seed = ReactDOM.render(<Seed onReady={(err) => { _err = err; done(); }} seedUrl="NonExistingExtensionId" />, containerElement);

    });

    it('should return an error message', () => {
      expect(_err).toBeDefined();
    });

  });

  describe('seed with everything set (Chrome)', () => {

    beforeAll((done) => {
      seed = ReactDOM.render(<Seed onReady={done} seedUrl="ijlncpebbpeeagehccegnddhhdgcaflf" />, containerElement);
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

  describe('change method from iframe to extension and vice versa', () => {
    describe('from iframe to extension', () => {
      it('should find an iframe', () => {
        seed = ReactDOM.render(<Seed seedUrl="https://www.google.it" />, containerElement);
        expect(document.querySelectorAll('#container iframe').length).toBe(1);

        seed = ReactDOM.render(<Seed seedUrl="ijlncpebbpeeagehccegnddhhdgcaflf" />, containerElement);
        expect(document.querySelectorAll('#container iframe').length).toBe(0);
      });
    });

    describe('from extension to iframe', () => {
      it('should not find an iframe', () => {
        seed = ReactDOM.render(<Seed seedUrl="ijlncpebbpeeagehccegnddhhdgcaflf" />, containerElement);
        expect(document.querySelectorAll('#container iframe').length).toBe(0);

        seed = ReactDOM.render(<Seed seedUrl="https://www.google.it" />, containerElement);
        expect(document.querySelectorAll('#container iframe').length).toBe(1);
      })
    });
  });

  describe('extension detection', () => {
    it('should find a secret DOM node in the page', () => {
      expect(document.getElementById('apiary-browser-extension')).toBeDefined();
    });
  });
});
