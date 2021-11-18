'use strict';

const InMemoryReposConfig = require('./in-memory');
const MariadbReposConfig = require('./mariadb');
const constants = require('../../config/constants');

class RepositoriesConfigFactory {
  constructor() {}

  create(dbDialect) {
    return selectRepos(dbDialect);
  }
}

function selectRepos(dbDialect) {
  const configsDictionary = {
    [constants.dbDialects.MARIA_DB]: new MariadbReposConfig(),
    [constants.dbDialects.IN_MEMORY]: new InMemoryReposConfig()
  };

  if (dbDialect in configsDictionary) {
    const reposConfig = configsDictionary[dbDialect];
    return reposConfig.getAllRepositories();
  }

  const inMemoryRepos = new InMemoryReposConfig();
  return inMemoryRepos.getAllRepositories();
}

module.exports = RepositoriesConfigFactory;
