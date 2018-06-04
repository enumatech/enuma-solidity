const { spawn } = require('child_process');
const { Readable } = require('stream');

module.exports = function sol2abi(source) {
  const solc = spawn('solc', ['--combined-json=abi']);
  const str = new Readable();

  return new Promise(function(resolve, reject) {
    str.pipe(solc.stdin);

    // todo: error
    solc.stdout.on('data', data => {
      const raw = JSON.parse(data.toString());
      const abi = Object.keys(raw.contracts).reduce((x, k) => {
        x[k.match(/<stdin>:(.*)/)[1]] = JSON.parse(raw.contracts[k].abi);
        return x;
      }, {});

      resolve(abi);
    });

    str.push(source);
    str.push(null);
  });
};
