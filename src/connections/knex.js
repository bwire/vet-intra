const knex = require('knex');

module.exports = knex({
  client: 'mysql',
  connection: {
    host: process.env.APP_HOST,
    user: process.env.USER_ADMIN,
    password: process.env.USER_ADMIN_PASS,
    database: process.env.DB_NAME,
  },
});
