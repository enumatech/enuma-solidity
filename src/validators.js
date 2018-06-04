const _ = require('lodash');

const v = {
  true: x => _.isBoolean(x) && x === true,

  string: x => _.isString(x),

  address: x => {
    return v.string(x) && x.startsWith('0x') && x.length === 42;
  }
};

const validators = Object.keys(v).reduce((x, k) => {
  x[k] = (x, msg) => {
    if (!v[k](x)) {
      throw new Error(msg);
    }
  };
  return x;
}, {});

module.exports = validators;
