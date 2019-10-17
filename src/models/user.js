const User = (db) => ({
  getUserByEmail: async (email) => await db('Users').where({ email }).first(),
});

module.exports = User;
