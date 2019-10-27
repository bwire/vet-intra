const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const { crypto: { hash } } =  require('../helpers');

const authenticate = (db) => async (email, password, done) => {
  const user = await User(db).getUserByEmail(email);
  if (!user) {
    return done(null, false, { message: 'Incorrect user name' });
  }
  if (hash(password) !== user.password) {
    return done(null, false, { message: 'Incorrect password' });
  }

  delete user.password;
  return done(null, user);
};

const serialize = ({ id }, done) => done(null, id);

const deserialize = (db) => async (id, done) => {
  const user = await User(db).getUserById(id);
  delete user.password;
  done(null, user);
};

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate(db)));
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize(db));
};
