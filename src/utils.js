const _ = require('lodash');

const docTypes = {
  bool: 'boolean',
  int: 'number',
  uint: 'number',
  address: 'string',
  string: 'string'
};

_.range(8, 264, 8).forEach(x => {
  docTypes[`uint${x}`] = 'number';
  docTypes[`int${x}`] = 'number';
});

const validators = {
  string: () => {},
  address: () => {}
};

module.exports = {
  docTypes,
  validators
};
