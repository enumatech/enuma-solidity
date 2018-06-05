const _ = require('lodash');

const v = {
  true: x => _.isBoolean(x) && x === true,
  string: x => _.isString(x),
  address: x => {
    return v.string(x) && x.startsWith('0x') && x.length === 42;
  }
};

_.range(8, 264, 8).forEach(x => {
  v[`uint${x}`] = () => true;
  v[`int${x}`] = () => true;
});

const validators = Object.keys(v).reduce((x, k) => {
  x[k] = (x, msg) => {
    if (!v[k]) {
      throw new Error(`${k} validator missing`);
    }

    if (!v[k](x)) {
      throw new Error(msg);
    }
  };
  return x;
}, {});

module.exports = validators;
