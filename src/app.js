'use strict';

const {
  RepositoriesConfig
} = require('./config/repositories');

const {
  UsersUseCasesConfig,
  ProductsUseCasesConfig,
  OrdersUseCasesConfig
} = require('./config/use-cases');

const {
  UsersControllersConfig,
  ProductsControllersConfig,
  OrdersControllersConfig
} = require('./config/controllers');

const {
  UsersRouterConfig,
  ProductsRouterConfig,
  OrdersRouterConfig
} = require('./config/web/routers');

const {
  WebAppConfig
} = require('./config/web/app');

module.exports = function initApp(dbDialect) {

  const repos = RepositoriesConfig.selectRepos(dbDialect);

  const usersUseCases = UsersUseCasesConfig.getAllUseCases(repos);
  const productsUseCases = ProductsUseCasesConfig.getAllUseCases(repos);
  const ordersUseCases = OrdersUseCasesConfig.getAllUseCases(repos);

  const usersControllers = UsersControllersConfig.getAllControllers(usersUseCases);
  const productsControllers = ProductsControllersConfig.getAllControllers(productsUseCases);
  const ordersControllers = OrdersControllersConfig.getAllControllers(ordersUseCases);

  const usersRouter = UsersRouterConfig.getUsersRouter(usersControllers);
  const productsRouter = ProductsRouterConfig.getProductsRouter(productsControllers);
  const ordersRouter = OrdersRouterConfig.getOrdersRouter(ordersControllers);

  const routers = [
    usersRouter,
    productsRouter,
    ordersRouter
  ];

  const expressApp = WebAppConfig.getExpressApp(routers, {});

  return expressApp.build();
};
