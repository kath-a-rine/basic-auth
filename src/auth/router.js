'use strict';

const express = require('express');
const router = express.Router;
const bcrypt = require('bcrypt');

const { UsersModel } = require('./models');
const { basicAuth } = require('./middleware/basic');

// Signup Route -- create a new user
router.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await UsersModel.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

// Signin Route -- login with username and password
router.post('/signin', basicAuth, async (req, res) => {

  res.status(200).json(req.user);

});

module.exports = router;
