'use strict'

const express = require('express');
const app = express();

const passport = require('passport'),
      LocalStrategy = require('passport-local'),
      bodyParser = require('body-parser');
      
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
app.use(bodyParser.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate));
passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Routes (temporary - just to test auth)
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret');
});

// Auth routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  })
);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('Server started...');
})