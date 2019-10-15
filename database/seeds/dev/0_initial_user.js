
exports.seed = (knex) => knex('Users').del()
  .then(() => knex('Users').insert([
    {
      firstName: 'admin',
      secondName: 'admin',
      lastName: 'admin',
      password: 'password', // should be hashed
    },
  ]));
