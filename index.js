const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const xml = require('xml');
const routes = require('http-zoo/src/routes');

const createResponseObject = (req) => {
  return Object.assign({
    id: req.params.id,
    name: 'Vincenzo',
    surname: 'Chianese',
    age: 27 // Ahi Ahi, getting older
  }, req.body);
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname)

app.use(cors());

app.get('/serve-seed.html', (req, res) => {
  setTimeout(() => {
    res.render('serve-seed.ejs', {
      seedUrl: process.env.APIARY_SEED_URL || 'http://localhost:3000',
      seedScope: req.query.scope || 'apiary-console',
      seedOrigin: req.query.origin || '*'
    });
  }, req.query.timeout || 0);
});

app.use(routes);
app.use(bodyParser.json());

app.post('/api/users/:id', (req, res) => {
  return res.json(createResponseObject(req));
});

app.post('/api/users/xml/:id', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(xml(createResponseObject(req)));
});

let server = undefined;

module.exports.start = (cb) => server = app.listen(process.env.PORT || 3001, cb);
module.exports.stop = (cb) => server.close(cb);

if (require.main === module)
  module.exports.start();
