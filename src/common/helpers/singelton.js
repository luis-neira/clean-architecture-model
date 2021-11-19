'use strict';

class SingeltonFactory {
  constructor() {}

  create(ConcreteClass) {
    let instance = new WeakMap();

    function Singelton() {}

    Singelton.prototype.getInstance = () => {
      if (instance.has(this)) return instance.get(this);
      instance.set(this, new ConcreteClass());
      return instance.get(this);
    };

    return new Singelton();
  }
}

module.exports = SingeltonFactory;
