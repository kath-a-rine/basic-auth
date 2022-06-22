'use strict';

const base64 = require('base-64');
// const bcrypt = require('bcrypt');
const UsersModel  = require('../models/users-model');

async function basicAuth(req, res, next) {
  let { authorization } = req.headers;

  if(!authorization){
    res.status(401).send('Not Authorized');
  } else {

    let encodedString = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(encodedString).split(':');

    try{
      req.user = await UsersModel.authenticateBasic(username, password);
      next();
    } catch(e){
      next('invalid login');
    }

  }
}

module.exports = basicAuth;
