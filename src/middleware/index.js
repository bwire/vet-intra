const bodyParser = require('body-parser');
const sessions = require('express-session');

const middleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));

  // implement session store && cors
  app.use(sessions({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
};

module.exports = middleware;
