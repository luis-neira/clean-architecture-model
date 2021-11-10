'use strict';

const { Sequelize } = require('sequelize');

const { initUserModel } = require('./models/User');
const { initProductModel } = require('./models/Product');
const { initOrderModel } = require('./models/Order');

const dialectOpts = {};

if (process.env.DB_DIALECT === 'mariadb') {
  Object.assign(dialectOpts, { autoJsonMap: false });
}

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  dialectOptions: dialectOpts,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
  define: {
    underscored: true
  }
});

const db = { sequelize };

initUserModel(sequelize);
initProductModel(sequelize);
initOrderModel(sequelize);

module.exports = db;
