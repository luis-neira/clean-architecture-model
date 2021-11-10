'use strict';

module.exports = class RepositoriesConfig {
  static getInMemoryRepos() {
    const { InMemoryReposConfig } = require('./in-memory');

    return InMemoryReposConfig.getAllRepos();
  }

  static getMariadbRepos() {
    const { MariadbReposConfig } = require('./mariadb');

    return MariadbReposConfig.getAllRepos();
  }

  static selectRepos(dbDialect) {
    const reposLookup = {
      inMemory: RepositoriesConfig.getInMemoryRepos,
      mariadb: RepositoriesConfig.getMariadbRepos
    };

    const getRepos = reposLookup[dbDialect];

    return getRepos() || RepositoriesConfig.getInMemoryRepos();
  }
};
