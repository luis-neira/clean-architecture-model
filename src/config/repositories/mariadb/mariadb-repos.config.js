'use strict';

module.exports = class MariadbReposConfig {
  constructor() {}

  getAllRepositories() {
    return {
      usersRepository: getUsersRepository(),
      productsRepository: getProductsRepository(),
      ordersRepository: getOrdersRepository()
    };
  }
};

function getUsersRepository() {
  const {
    UsersRepository
  } = require('../../../infrastructure/repositories/mariadb');

  return new UsersRepository();
}

function getProductsRepository() {
  const {
    ProductsRepository
  } = require('../../../infrastructure/repositories/mariadb');

  return new ProductsRepository();
}

function getOrdersRepository() {
  const {
    OrdersRepository
  } = require('../../../infrastructure/repositories/mariadb');

  return new OrdersRepository();
}
