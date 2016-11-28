const express = require('express');

const app = express();

app.get('/api/data1', (req, res) => {
  res.json({ 'nasino': 2 });
})

app.listen(process.env.PORT || 3001)