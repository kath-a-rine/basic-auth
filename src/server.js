'use strict';

// 3rd Party Resources
const express = require('express');
const authRouter = require('./auth/router');

// Prepare the express app
const app = express();

const PORT = process.env.PORT || 3002;
console.log(PORT);
// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
};
