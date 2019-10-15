
exports.up =  (knex) => knex.schema
  .createTable('Users', (table) => {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('secondName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  });

exports.down = (knex) => knex.schema
  .dropTable('Users');
