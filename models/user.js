'use strict'

const User = () => {
  const tmpName = 'barbedwire';
  const tmpPass = '12345';
  return {
    authenticate: (username, password, done) => {
      if (username != tmpName) {
        return done(null, false, { message: 'Incorrect user name'});
      }
      if (password != tmpPass) {
        return done(null, false, { message: 'Incorrect password'});
      }
      return done(null,  {
        id: 1,
        name: tmpName,
        passowrd: tmpPass
      });
    },
    serialize: (user, done) => {
      done(null, user.id)
    },
    deserialize: (id, done) => {
      done(null, {
        id: 1,
        name: tmpName,
        passowrd: tmpPass
      });
    }
  }
};

module.exports = User();