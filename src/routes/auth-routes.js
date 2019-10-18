const express = require('express');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    approved: false,
  };

  req.db('users').insert(user)
    .then((newUser) => {
      console.log('New user recorded', newUser);
      res.json(newUser);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
