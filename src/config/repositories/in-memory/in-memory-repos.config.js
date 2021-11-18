'use strict';

module.exports = class InMemoryReposConfig {
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
  } = require('../../../infrastructure/repositories/in-memory');

  return new UsersRepository();
}

function getProductsRepository() {
  const {
    ProductsRepository
  } = require('../../../infrastructure/repositories/in-memory');

  return new ProductsRepository();
}

function getOrdersRepository() {
  const {
    OrdersRepository
  } = require('../../../infrastructure/repositories/in-memory');

  return new OrdersRepository();
}
