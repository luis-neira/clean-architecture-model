'use strict';

const { ValueObject } = require('../value-object');
const { Result } = require('../../lib/result');
const { ValidationError } = require('../../../common/errors');

module.exports.LastName = class LastName extends ValueObject {
  constructor(props) {
    super(props);
  }

  get value() {
    return this.props.value;
  }

  static create(lastName) {
    if (lastName === undefined || lastName === null) {
      return Result.fail(new ValidationError("User 'lastName' must exist."));
    }

    if (lastName.length <= 2 || lastName.length > 100) {
      return Result.fail(
        new ValidationError(
          "User 'lastName' must be greater than 2 chars & less than 100."
        )
      );
    }

    return Result.ok(new LastName({ value: lastName }));
  }
};
