import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../../Seed';


describe('Status Codes', () => {

  let seed = undefined;

  beforeAll((done) => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);

    seed = ReactDOM.render(<Seed
      scope="apiary-console"
      seedUrl="http://localhost:3001/apiary/proxy"
      origin="*"
      onReady={done}
      />, document.getElementById('container'));
  });

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
  });


  const statuses = [
    { code: 200, text: 'OK' },
    { code: 201, text: 'Created' },
    { code: 204, text: 'No Content' },
    { code: 400, text: 'Bad Request' },
    { code: 401, text: 'Unauthorized' },
    { code: 403, text: 'Forbidden' },
    { code: 404, text: 'Not Found' },
    { code: 405, text: 'Method Not Allowed' },
    { code: 429, text: 'Too Many Requests' },
    { code: 500, text: 'Internal Server Error' },
    { code: 503, text: 'Service Unavailable' },
  ];


  statuses.forEach((item) => {
    it(`should handle ${item.code} status code gracefully`, (done) => {
      const handleResponse = (res) => {
        expect(res.status).toBe(item.code);
        expect(res.statusText).toBe(item.text);
        done();
      };

      seed.request({ url: `http://localhost:3001/statuses/${item.code}` })
        .then(handleResponse,
              done.fail.bind(this, new Error('This promise should not have been rejected')));
    }, 5000);
  });
});
