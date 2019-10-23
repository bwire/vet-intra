const express = require('express');
const { validateSignUp, validationResult } = require('../middleware/validator');
const User = require('../models/user');

require('express-async-errors');

const router = express.Router();

async function completeResponse(res, errors, fn) {
  return errors.isEmpty()
    ? await res.json(fn())
    : res.status(422).json({ errors: errors.array() });
}

router.post('/signup', validateSignUp(User), async (req, res) => {
  completeResponse(res, validationResult(req), () => User(req.db).createNewUser(req.body));
});

module.exports = router;
