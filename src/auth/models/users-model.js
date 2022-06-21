'use strict';

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
  return users;
};

module.exports = {
  UsersModel,
};
