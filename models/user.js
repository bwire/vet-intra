'use strict'

const User = () => {
  const tmpName = 'barbedwire';
  const tmpPass = '12345';
  return {
    serialize: (user, done) => {
      done(null, user.id)
    },
    deserialize: (id, done) => {
      done(err, {
        id: 1,
        name: tmpName,
        passowrd: tmpPass
      });
    }
  }
};

module.exports = User();