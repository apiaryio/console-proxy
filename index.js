const express = require('express');

const app = express();

app.get('/api/users/:user', (req, res) => {
  return res.json({
    id: req.params.id,
    name: 'Vincenzo',
    surname: 'Chianese',
    age: 27 // Ahi Ahi, getting older
  });
});

app.listen(process.env.PORT || 3001);
