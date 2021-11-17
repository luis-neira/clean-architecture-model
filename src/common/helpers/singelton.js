'use strict';

function makeSingelton(ConcreteClass) {
  let instance = null;

  return {
    getInstance() {
      if (instance) return instance;
      return new ConcreteClass();
    }
  };
}

module.exports = { makeSingelton };
