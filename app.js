const express = require('express');
const app = express();
//const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/vet-inta-tmp');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

// TODO: use process.env values
app.listen(3000, 'localhost', () => {
  console.log('Server started...');
})