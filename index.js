const sol2abi = require('./src/sol2abi');
const abi2js = require('./src/abi2js');

module.exports = (sol, provider, cb) => {
  sol2abi(sol, (err, abi) => {
    if (err) return cb(err);

    cb(null, abi2js(abi, provider));
  });
};
