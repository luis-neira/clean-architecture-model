'use strict';

module.exports.Left = class Left {
  value;

  constructor(value) {
    this.value = value;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }
};

module.exports.Right = class Right {
  value;

  constructor(value) {
    this.value = value;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  applyOnRight(func) {
    return new Right(func(this.value));
  }
};

module.exports.left = (l) => {
  return new Left(l);
};

module.exports.right = (a) => {
  return new Right(a);
};
