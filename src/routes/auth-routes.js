const express = require('express');
const passport = require('passport');
const { serverErrors } = require('../helpers');
const { validateSignUp } = require('../middleware/validator');
const User = require('../models/user');

require('express-async-errors');

const router = express.Router();

router.post('/signup', validateSignUp(User),
  async (req, res) => res.json(await User(req.db).createNewUser(req.body)));

router.post('/signin',
  async (req, res, next) => passport.authenticate('local',
    (error, user, info) => {
      if (error) {
        return serverErrors.unauthorized('failed to login');
      }
      if (!user) {
        return serverErrors.unauthorized(info);
      }
      req.login(user, (err) => err
        ? serverErrors.unauthorized('failed to login')
        : res.send('User authenticated!\n'));
    })(req, res, next));

module.exports = router;
