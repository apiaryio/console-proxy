import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../Seed';

const div = document.createElement('div');
div.setAttribute('id', 'container');
document.body.appendChild(div);

describe('Bad response', () => {
  let seed = undefined;

  beforeAll((done) => {
    seed = ReactDOM.render(<Seed
      scope="apiary-console"
      seedUrl="http://localhost:3001/serve-seed.html"
      origin="*"
      onReady={done}
      />, document.getElementById('container'));
  });

  // Server accepts traffic but never sends back data
  it('should handle no response gracefully', (done) => {
    seed.request({ url: '/responses/none', timeout: 5000 })
      .then(done.fail.bind(this, 'This promise should not have been resolved'), (err) => {
        expect(err.code).toBe('ECONNABORTED');
        done();
      });
  }, 35000);

  // Server sends back an empty string immediately upon connection
  it('should handle empty response gracefully (GET)', (done) => {
    seed.request({ url: '/responses/empty', method: 'GET', timeout: 5000 })
      .then(done.fail.bind(this, 'This promise should not have been resolved'), (err) => {
        // Node.js returns 'ECONNRESET', browser 'Network Error'
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'ECONNRESET' : 'Network Error';

        expect(actual).toBe(expected);

        done();
      });
  }, 35000);

  // Server sends back an empty string after client sends data
  it('should handle empty response gracefully (POST)', (done) => {
    seed.request({ url: '/responses/empty-string', method: 'POST', data: 'foo bar', timeout: 5000 })
      .then(done.fail.bind(this, 'This promise should not have been resolved'), (err) => {
        // Node.js returns 'ECONNRESET', browser 'Network Error'
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'ECONNRESET' : 'Network Error';

        expect(actual).toBe(expected);

        done();
      });
  }, 35000);

  // Server sends back a malformed response ("foo bar") immediately upon connection
  it('should handle malformed response gracefully (GET)', (done) => {
    seed.request({ url: '/responses/malformed', method: 'GET' })
      // Chrome and Firefox parse malformed response with 2OO status code
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data).toBe('foo bar');
        done();
      })
      // ...but Safari and Node.js return parsing error
      .catch((err) => {
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'HPE_INVALID_CONSTANT' : 'Network Error';

        expect(actual).toBe(expected);

        done();
      });
  }, 35000);

  // Server sends back a malformed response ("foo bar") after the client sends data
  it('should handle malformed response gracefully (POST)', (done) => {
    seed.request({ url: '/responses/malformed', method: 'POST', data: 'foo bar' })
      // Chrome and Firefox parse malformed response with 2OO status code
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data).toBe('foo bar');
        done();
      })
      // ...but Safari and Node.js return parsing error
      .catch((err) => {
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'HPE_INVALID_CONSTANT' : 'Network Error';

        expect(actual).toBe(expected);

        done();
      });
  }, 35000);
});
