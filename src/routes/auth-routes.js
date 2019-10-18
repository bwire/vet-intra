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

  return errors.isEmpty()
    ? await User(req.db).createNewUser(req.body)
    : res.status(422).json({ errors: errors.array() });
});

module.exports = router;
