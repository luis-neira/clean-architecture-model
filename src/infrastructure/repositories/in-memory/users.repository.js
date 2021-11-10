'use strict';

const { v4: uuidv4 } = require('uuid');

const { inMemorydb } = require('../../orm/in-memory');
const { UserMap } = require('../../../common/mappers');

module.exports = class UserRepository {
  _db = inMemorydb;

  async add(user) {
    try {
      const { users } = this._db;
      if (!user.id) user.id = uuidv4();

      users.push(UserMap.toPersistence(user));
      const persistedUser = users[users.length - 1];
      return UserMap.toDomain(persistedUser);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async update(user) {
    try {
      const { users } = this._db;
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex < 0) return null;

      users[userIndex] = user;
      return UserMap.toDomain(users[userIndex]);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async delete(user) {
    try {
      const { users } = this._db;
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex < 0) return null;

      const deletedUsers = users.splice(userIndex, 1);
      return UserMap.toDomain(deletedUsers[0]);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const { users } = this._db;
      const persistedUser = users.find((u) => u.id === id);
      if (!persistedUser) return null;

      return UserMap.toDomain(persistedUser);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }
};
