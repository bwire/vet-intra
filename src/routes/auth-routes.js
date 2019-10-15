const express = require('express');
const passport = require('passport');

const { serverErrors } = require('../helpers');

require('express-async-errors');

const router = express.Router();

router.post('/login', async (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return serverErrors.unauthorized('failed to login');
    }

    if (!user) {
      return serverErrors.unauthorized('email or passwort is incorect');
    }

    return req.logIn(user, (error) => error
      ? serverErrors.unauthorized('failed to login') : res.json(user));
  });
});

module.exports = router;
