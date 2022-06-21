'use strict';

const bcrypt = require('bcrypt');

// Create a Sequelize model
const UsersModel = (sequelize, DataTypes) => {

  let users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  users.authenticateBasic = async function (username, password) {
    try {
      const user = await UsersModel.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if(valid) {
        return user;
      }
    } catch(e) {
      console.error(e);
      return e;
    }
  };
  return users;
};

module.exports = UsersModel;
