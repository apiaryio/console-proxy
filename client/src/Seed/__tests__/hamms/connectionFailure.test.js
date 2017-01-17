import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../Seed';


describe('Connection Failure', () => {
  let seed = undefined;

  beforeAll((done) => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);

    seed = ReactDOM.render(<Seed
      scope="apiary-console"
      seedUrl="http://localhost:3001/serve-seed.html"
      origin="*"
      onReady={done}
      />, document.getElementById('container'));
  });

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
  });


  // Connection that hangs forever
  it('should handle connection timeout gracefully', (done) => {
    seed.request({ url: 'http://www.google.com:81', timeout: 5000 })
      .then(done.fail.bind(this, 'This promise should not have been resolved'), (err) => {
        expect(err.code).toBe('ECONNABORTED');
        done();
      });
  }, 35000);
});
