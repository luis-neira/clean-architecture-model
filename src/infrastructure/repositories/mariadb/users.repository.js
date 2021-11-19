'use strict';

const { sequelize } = require('../../orm/sequelize');
const { UserMap } = require('../../../common/mappers');

const UsersRepository = (function () {
  let _model = new WeakMap();

  class UsersRepository {
    constructor() {
      _model.set(this, sequelize.model('User'));
    }

    async add(user) {
      const userRawData = UserMap.toPersistence(user);

      const model = _model.get(this);
      const addedUser = await model.create(userRawData);

      return UserMap.toDomain(addedUser.toJSON());
    }

    async getById(userId) {
      const model = _model.get(this);
      const foundUser = await model.findOne({
        where: { id: userId }
      });

      if (!foundUser) return null;

      return UserMap.toDomain(foundUser.toJSON());
    }

    async update(newRawUserData) {
      const model = _model.get(this);
      const foundUser = await model.findOne({
        where: { id: newRawUserData.id }
      });

      if (!foundUser) return null;

      Reflect.deleteProperty(newRawUserData, 'id');

      foundUser.set({
        ...newRawUserData
      });

      await foundUser.save();

      return UserMap.toDomain(foundUser.toJSON());
    }

    async delete(rawUserData) {
      const model = _model.get(this);
      const foundUser = await model.findOne({
        where: { id: rawUserData.id }
      });

      if (!foundUser) return null;

      await foundUser.destroy();

      return UserMap.toDomain(foundUser.toJSON());
    }
  }

  return UsersRepository;
})();

module.exports = UsersRepository;
