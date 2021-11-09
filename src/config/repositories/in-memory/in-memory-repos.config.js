'use strict';

const {
  UsersRepository,
  OrdersRepository,
  ProductsRepository
} = require('../../../infrastructure/repositories/in-memory');

module.exports.InMemoryReposConfig = class InMemoryReposConfig {
  static getAllRepos() {
    return {
      usersRepository: new UsersRepository(),
      ordersRepository: new OrdersRepository(),
      productsRepository: new ProductsRepository()
    };
  }
};
