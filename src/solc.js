const { spawn } = require('child_process');
const { Readable } = require('stream');

module.exports = function solc(source, combined = []) {
  const solc = spawn('solc', [`--combined-json=${combined.join(',')}`]);
  const str = new Readable();

  return new Promise(function(resolve, reject) {
    str.pipe(solc.stdin);

    // todo: error
    solc.stdout.on('data', data => {
      const raw = JSON.parse(data.toString());
      const result = Object.keys(raw.contracts).reduce((x, k) => {
        const contract = raw.contracts[k];
        const name = k.match(/<stdin>:(.*)/)[1];

        x[name] = {};
        if (contract.abi) {
          x[name].abi = JSON.parse(contract.abi);
        }
        if (contract.bin) {
          x[name].bin = contract.bin;
        }
        return x;
      }, {});

      resolve(result);
    });

    str.push(source);
    str.push(null);
  });
};
