const seed = async (knex) => {
  const users = knex('Users');
  await users.del();
  users.insert({
    firstName: 'admin',
    secondName: 'admin',
    lastName: 'admin',
    password: 'password',
    eMail: 'myemail@gmail.com',
    approved: true,
  });
};

module.exports = { seed };
