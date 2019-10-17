const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(
    async (email, password, done) => {
      const user = await User(db).getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Incorrect user name' });
      }

      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, {
        id: user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        lastName: user.lstName,
        email: user.email,
        approved: user.approved,
      });
    },
  ));
  passport.serializeUser(({ id }, done) => done(null, id));
  passport.deserializeUser((user, done) => done(null, user));
};
