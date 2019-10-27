const express = require('express');
const passport = require('passport');
const { serverErrors } = require('../helpers');
const { validateSignUp, validateSignIn } = require('../middleware/validator');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', validateSignUp(User),
  async (req, res) => res.json(await User(req.db).createNewUser(req.body)));

router.post('/signin', validateSignIn(),
  (req, res, next) => passport.authenticate('local',
    async (error, user, info) => {
      if (error) {
        return serverErrors.unauthorized('failed to login');
      }
      if (!user) {
        return serverErrors.unauthorized(res, info);
      }
      req.login(user, (err) => err
        ? serverErrors.unauthorized('failed to login')
        : res.send('User authenticated!\n'));
    })(req, res, next));

router.get('/signout', (req, res) => {
  req.logout();
  res.send('User logged out');
});

module.exports = router;
