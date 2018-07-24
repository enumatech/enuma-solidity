const solc = require('./solc');
const abi2js = require('./abi2js');
const combine = require('./combine');

module.exports = async function(filepath, { provider }) {
  const sol = await combine(filepath);
  const contacts = await solc(sol, ['abi']);
  const js = abi2js(contacts, provider);

  return js;
};
