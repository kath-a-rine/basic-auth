'use strict'
;

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UsersModel = require('./users-model');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory:'
  : process.env.DATABASE_URL;

let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, options);

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

module.exports = {
  sequelize,
  UsersModel: UsersModel(sequelize, DataTypes),
};
