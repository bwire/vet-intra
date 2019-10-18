require('dotenv').config();
const express = require('express');
const knex = require('./connections/knex');
const middleware = require('./middleware');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');

module.exports = () => {
  const app = express();
  middleware(app, knex);
  routes(app);
  errorHandler(app);

  app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log('Server started...');
  });
};
