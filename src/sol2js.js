const sol2abi = require('./sol2abi');
const abi2js = require('./abi2js');
const combine = require('./combine');

module.exports = async function(filepath, { provider }) {
  const sol = await combine(filepath);
  const abi = await sol2abi(sol);
  const js = abi2js(abi, provider);

  return js;
};
