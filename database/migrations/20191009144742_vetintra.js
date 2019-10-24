const up = (knex) => knex.schema
  .createTable('users', (table) => {
    table.collate('utf8_unicode_ci');
    table.charset('utf8');
    table.increments('id').primary();
    table.string('firstName', 255).notNullable();
    table.string('secondName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('approved').defaultTo(false);
    table.boolean('enabled').defaultTo(false);
  });

const down = (knex) => knex.schema.dropTable('users');

const config = {
  transaction: false,
};

module.exports = { up, down, config };
