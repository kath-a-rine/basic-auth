'use strict';

// 3rd Party Resources
const express = require('express');

const cors = require('cors');

// Prepare the express app
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
};
