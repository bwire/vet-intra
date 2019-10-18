const express = require('express');
const { check, validationResult } = require('express-validator');
const { crypto: { hash } } =  require('../helpers');

require('express-async-errors');

const router = express.Router();

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash(req.body.password),
    approved: false,
  };

  const newUser = await req.db('users').insert(user);
  console.log('New user recorded', newUser);
  res.json(newUser);
});

module.exports = router;
