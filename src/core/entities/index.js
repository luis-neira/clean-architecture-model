'use strict';

module.exports = {
  Product: require('./product.entity'),
  Order: require('./order.entity'),
  User: require('./user.entity').User,
  constants: {
    userConstants: require('./user.entity').userConstants
  }
};
