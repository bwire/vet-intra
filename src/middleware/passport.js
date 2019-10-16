const passport = require('passport');
const LocalStrategy = require('passport-local');

const UserModel = require('../models/user');

const serialize = ({ id }, done) => done(null, id);
const deserialize = (user, done) => done(null, user);
const authenticate = (db) => async (email, password, done) => {
  const user = await UserModel(db).getUserByEmail(email);

  if (!user) {
    return done(null, false, { message: 'Incorrect user name' });
  }

  if (password !== user.passowrd) {
    return done(null, false, { message: 'Incorrect password' });
  }

  return done(null,  {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
};

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(authenticate(db)));
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
};
