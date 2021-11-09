'use strict';

const {
  InMemoryReposConfig
} = require('./in-memory/in-memory-repos.config');

module.exports = class RepositoriesConfig {
  static getInMemoryRepos() {
    return InMemoryReposConfig.getAllRepos();
  }

  static getRepos(name) {
    const reposLookup = {
      development: RepositoriesConfig.getInMemoryRepos()
    };

    return reposLookup[name] || RepositoriesConfig.getInMemoryRepos();
  }
};
