const User = (db) => () => ({

  async getUser(id) {
    return await db('Users').where({ id }).first();
  },

  async getUserByEmail(email) {
    return await db('Users').where({ email }).first();
  },

});

module.exports = User();
