const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

require('express-async-errors');

const router = express.Router();

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const userDb = User(req.db);
    const existingUser = await userDb.getUserByEmail(req.body.email);

    console.log(existingUser);
    
    if (!existingUser) {
      return await User(req.db).createNewUser(req.body);
    }
    errors.array().push({
      value: req.body.email,
      msg: 'User with this e-mail already exists',
      param: 'email',
      location: 'body',
    });
  }
  res.status(422).json({ errors: errors.array() });
});

module.exports = router;
