'use strict'

const express = require('express');
const app = express();
const passport = require('passport');
      
const User = require('./models/user');

// config
require('dotenv').config();

// app
app.set('view engine', 'ejs');
app.use(require('express-session')({ 
  secret: process.env.PASSPORT_SECRET,
  resave: false, 
  saveUninitialized: false,
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

// TODO: use process.env values
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('Server started...');
})