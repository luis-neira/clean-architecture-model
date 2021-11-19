'use strict';

const { v4: uuidv4 } = require('uuid');

const inMemorydb = require('../../orm/in-memory');
const { UserMap } = require('../../../common/mappers');

const UsersRepository = (function () {
  let _db = new WeakMap();

  class UsersRepository {
    constructor() {
      _db.set(this, inMemorydb);
    }

    async add(user) {
      const { users } = _db.get(this);
      if (!user.id) user.id = uuidv4();

      users.push(UserMap.toPersistence(user));
      const persistedUser = users[users.length - 1];
      return UserMap.toDomain(persistedUser);
    }

    async update(user) {
      const { users } = _db.get(this);
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex < 0) return null;

      users[userIndex] = user;
      return UserMap.toDomain(users[userIndex]);
    }

    async delete(user) {
      const { users } = _db.get(this);
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex < 0) return null;

      const deletedUsers = users.splice(userIndex, 1);
      return UserMap.toDomain(deletedUsers[0]);
    }

    async getById(id) {
      const { users } = _db.get(this);
      const persistedUser = users.find((u) => u.id === id);
      if (!persistedUser) return null;

      return UserMap.toDomain(persistedUser);
    }
  }

  return UsersRepository;
})();

module.exports = UsersRepository;
