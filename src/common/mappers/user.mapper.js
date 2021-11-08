'use strict';

const { User } = require('../../core/entities');

module.exports = class UserMap {
  static toDTO(user) {
    return {
      id: user.id,
      name: user.props.name,
      lastName: user.props.lastName,
      gender: user.props.gender,
      meta: user.props.meta
    };
  }

  static toPersistence(user) {
    return {
      id: user.id,
      name: user.name.value,
      lastName: user.lastName.value,
      gender: user.gender.value,
      meta: user.meta
    };
  }

  static toDomain(raw) {
    return User.create(
      {
        name: raw.name,
        lastName: raw.lastName,
        gender: raw.gender,
        meta: raw.meta
      },
      raw.id
    );
  }
};
