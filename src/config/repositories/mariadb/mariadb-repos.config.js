'use strict';

const {
  UsersRepository,
  ProductsRepository,
  OrdersRepository
} = require('../../../infrastructure/repositories/mariadb');

module.exports = class MariadbReposConfig {
  static getAllRepos() {
    return {
      usersRepository: new UsersRepository(),
      ordersRepository: new OrdersRepository(),
      productsRepository: new ProductsRepository()
    };
  }
};
