const express = require('express');
const UserModel = require('../models/user');

const router = express.Router();

// TODO
router.post('/', async (req, res) => { res.json(req.body); });
router.put('/:id', async (req, res) => {  res.json(req.body); });
router.delete('/:id', async (req, res) => {  res.json(req.body); });

router.get('/:id', async (req, res) => {
  const result = await UserModel(req.db).getUser(req.params.id);
  res.json(result);
});

module.exports = router;
