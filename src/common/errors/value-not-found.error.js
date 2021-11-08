'use strict';

const constants = require('../../config/constants');

module.exports = class ValueNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.code = constants.ERR_VALUE_NOT_FOUND;
  }
};
