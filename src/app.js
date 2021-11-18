'use strict';

const RepositoriesConfigFactory = require('./config/repositories');
const UseCasesConfig = require('./config/use-cases');
const ControllersConfig = require('./config/controllers');
const RoutersConfig = require('./config/web/routers');
const WebAppConfig = require('./config/web/app');

const App = (function () {
  let _dbDialect;

  class App {
    constructor(dbDialect) {
      _dbDialect = dbDialect;
      Object.freeze(this);
    }

    init() {
      const repositoriesConfigFactory = new RepositoriesConfigFactory();
      const reposDictionary = repositoriesConfigFactory.create(_dbDialect);

      const useCasesConfig = new UseCasesConfig(reposDictionary);
      const useCasesDictionary = useCasesConfig.getUseCases();

      const controllersConfig = new ControllersConfig(useCasesDictionary);
      const controllersDictionary = controllersConfig.getControllers();

      const routersConfig = new RoutersConfig(controllersDictionary);
      const routersList = routersConfig.getRouters();

      const webAppConfig = new WebAppConfig(routersList, {});
      const expressApp = webAppConfig.getExpressApp();

      return expressApp.build();
    }
  }

  return App;
})();

module.exports = App;
