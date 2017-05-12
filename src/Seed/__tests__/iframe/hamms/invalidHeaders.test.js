import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../../Seed';


describe('Invalid Headers', () => {
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

  // Server will send a response with a Content-Length: 3 header,
  // however the response is actually 26
  it('should handle different Content-Length in response gracefully', (done) => {
    seed.request({ url: '/headers/content-length', timeout: 5000 })
      // Browser strips request body according to length
      // set in the header and resolves promise
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.length).toBe(3);
        done();
      })
      .catch((err) => {
        expect(err.code).toBe('HPE_INVALID_CONSTANT');
        done();
      });
  });
});
