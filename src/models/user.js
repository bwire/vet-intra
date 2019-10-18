const { crypto: { hash } } =  require('../helpers');

const User = (db) => ({
  createNewUser: async (data) => {
    const user = { approved: true, ...data };
    user.password = hash(data.password);
    const newUser = await db('users').insert(user);

    console.log('New user recorded', newUser);
    return newUser;
  },
  getUserByEmail: async (email) => await db('Users').where({ email }).first(),
});

module.exports = User;
