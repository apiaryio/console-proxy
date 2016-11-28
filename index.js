const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './')

app.post('/api/users/:user', (req, res) => {
  return res.json(Object.assign({
    id: req.params.id,
    name: 'Vincenzo',
    surname: 'Chianese',
    age: 27 // Ahi Ahi, getting older
  }, req.body));
});

app.get('/serve-seed.html', (req, res) => {
  res.render('./serve-seed.ejs', {
    url: process.env.APIARY_SEED_URL || 'http://localhost:3000'
  });
});

app.listen(process.env.PORT || 3001);
