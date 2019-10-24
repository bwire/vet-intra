const express = require('express');
const { validateSignUp } = require('../middleware/validator');
const User = require('../models/user');

require('express-async-errors');

const router = express.Router();

router.post('/signup', validateSignUp(User), async (req, res) => res.json(User(req.db).createNewUser(req.body)));

module.exports = router;
