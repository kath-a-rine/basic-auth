'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { basicAuth } = require('./auth/middleware/basic');
const UsersModel = require('./auth/models');

const cors = require('cors');

// Prepare the express app
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await UsersModel.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

// Signin Route -- login with username and password
app.post('/signin', basicAuth, async (req, res) => {

  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  try {
    const user = await UsersModel.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

});

// make sure our tables are created, start up the HTTP server.
// SHOULD THIS BE IN INDEX.JS?
// sequelize.sync()
//   .then(() => {
//     app.listen(3000, () => console.log('server up'));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });

module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on', PORT)),
};
