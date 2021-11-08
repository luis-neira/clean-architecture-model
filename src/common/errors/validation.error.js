'use strict';

const constants = require('../../config/constants');

module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.code = constants.ERR_VALIDATION;
  }
};

// module.exports.UsernameTakenError = class UsernameTakenError extends Result {
//   constructor(username) {
//     const error = {
//       message: `The username "${username}" has already been taken.`
//     };
//     super(false, error);
//   }

//   static create(username) {
//     return new UsernameTakenError(username);
//   }
// };
