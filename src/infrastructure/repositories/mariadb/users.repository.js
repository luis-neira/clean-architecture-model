'use strict';

const { sequelize } = require('../../orm/sequelize');
const { UserMap } = require('../../../common/mappers');

module.exports = class UsersRepository {
  constructor() {
    this._db = sequelize;
    this.model = this._db.model('User');
  }

  async add(user) {
    const userRawData = UserMap.toPersistence(user);

    const addedUser = await this.model.create(userRawData);

    return UserMap.toDomain(addedUser.toJSON());
  }

  async getById(userId) {
    const foundUser = await this.model.findOne({
      where: { id: userId }
    });

    if (!foundUser) return null;

    return UserMap.toDomain(foundUser.toJSON());
  }

  async update(newRawUserData) {
    const foundUser = await this.model.findOne({
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
    const foundUser = await this.model.findOne({
      where: { id: rawUserData.id }
    });

    if (!foundUser) return null;

    await foundUser.destroy();

    return UserMap.toDomain(foundUser.toJSON());
  }
};
