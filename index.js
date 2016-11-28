const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/users/:user', (req, res) => {
  return res.json(Object.assign({
    id: req.params.id,
    name: 'Vincenzo',
    surname: 'Chianese',
    age: 27 // Ahi Ahi, getting older
  }, req.body));
});

app.use(express.static('./', {
  extensions: ['html']
}));

app.listen(process.env.PORT || 3001);
