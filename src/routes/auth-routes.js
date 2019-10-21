const express = require('express');
const { validateSignUp, checkForExistingEmail, result } = require('../middleware/validator');
const User = require('../models/user');

require('express-async-errors');

const router = express.Router();

router.post('/signup', validateSignUp(), async (req, res) => {
  const users = User(req.db);
  await checkForExistingEmail(users).run(req);

  const errors = result(req);
  return (errors.isEmpty())
    ? await users.createNewUser(req.body)
    : res.status(422).json({ errors: errors.array() });
});

module.exports = router;
