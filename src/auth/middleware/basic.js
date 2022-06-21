'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const UsersModel  = require('../models/users-model');

async function basicAuth(req, res, next) {
  let { authorization } = req.headers;

  if(!authorization){
    res.status(401).send('Not Authorized');
  } else {
    // let authStr = authorization.split(' ');
    // console.log('authStr: ', authStr);

    // let decodedAuthStr = base64.decode(authStr);
    // console.log('decodedAuthStr: ', decodedAuthStr);

    // let [ username, password ] = decodedAuthStr.split(':');
    // console.log('username:', username);
    // console.log('password:', password);

    let encodedString = req.headers.authorization.split(' ').pop();  // ['Basic', 'sdkjdsljd=']
    let [username, password] = base64.decode(encodedString).split(':'); // "username:password"
    
    let user = await UsersModel.findOne({where: {username}});
    let validUser = await bcrypt.compare(password, user.password);
    if(validUser){
      req.user = user;
      next();
    } else {
      next('Not Authorized');
    }
  }
}

module.exports = {
  basicAuth,
};
