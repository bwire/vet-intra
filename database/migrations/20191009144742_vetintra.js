const up = (knex) => knex.schema
  .createTable('users', (table) => {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('secondName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.boolean('approved');
  });

const down = (knex) => knex.schema.dropTable('users');

const config = {
  transaction: false,
};

module.exports = { up, down, config };
