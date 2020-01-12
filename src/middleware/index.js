const bodyParser = require('body-parser');
const sessions = require('express-session');
const cors = require('cors');
const passport = require('./passport');

const middleware = (app, knex) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.set('view engine', 'ejs');

  app.use(sessions({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

  passport(app, knex);

  // db operations attached
  app.use((req, res, next) => {
    req.db = knex;
    next();
  });
};

module.exports = middleware;
