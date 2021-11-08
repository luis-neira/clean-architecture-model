'use strict';

module.exports.Result = class Result {
  isSuccess;
  isFailure;
  error;
  value;

  constructor(isSuccess, error, value) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  getValue() {
    if (!this.isSuccess) {
      return this.error;
    }
    return this.value;
  }

  getError() {
    if (this.isFailure) {
      return this.error;
    }
    return undefined;
  }

  static ok(result) {
    return new Result(true, null, result);
  }

  static fail(error) {
    return new Result(false, error);
  }

  static combine(results) {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
};
