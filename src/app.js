const express = require('express');
const knex = require('./connections/knex');
const middleware = require('./middleware');
const passport = require('./middleware/passport');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');

// config
require('dotenv').config();

module.exports = () => {
  const app = express();

  middleware(app);
  passport(app, knex);

  // handlers
  app.use((req, res, next) => {
    req.db = knex;
    next();
  });

  routes(app);
  errorHandler(app);

  app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log('Server started...');
  });
};
