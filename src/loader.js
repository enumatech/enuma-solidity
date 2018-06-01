const sol2abi = require('./sol2abi');
const abi2js = require('./abi2js');

const generate = (content, cb) => {
  sol2abi(content, (err, abi) => {
    if (err) return cb(err);

    const source = abi2js(abi, 'ws://localhost:7545');

    cb(null, source);
  });
};

module.exports = function(content, map, meta) {
  const callback = this.async();
  generate(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
