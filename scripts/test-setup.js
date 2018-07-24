const gethd = require('../../gethd');

module.exports = async () => {
  await gethd.start();
  await gethd.waitForReady();
  global.gethd = gethd;
};
