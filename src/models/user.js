const { crypto: { hash } } = require('../helpers');

const User = () => (db) => {
  const table = db('users');
  return {
    createNewUser: async (data) => {
      const user = { ...data };
      user.password = hash(data.password);
      const newUser = await table.insert(user);
      return newUser;
    },
    getUserByEmail: async (email) => await table.where({ email }).first(),
    getUserById: async (id) => await table.where({ id }).first(),
  };
};

module.exports = User();
