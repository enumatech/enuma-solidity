const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const sol2js = require('./sol2js');

const schema = {
  type: 'object',
  properties: {
    provider: {
      type: 'string'
    }
  }
};

module.exports = function(content, map, meta) {
  const options = loaderUtils.getOptions(this);
  const cb = this.async();

  validateOptions(schema, options, 'sol-loader');

  sol2js(this.resourcePath, options)
    .then(result => {
      cb(null, result, map, meta);
    })
    .catch(cb);
};
