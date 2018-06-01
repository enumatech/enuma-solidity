const { spawn } = require('child_process');
const { Readable } = require('stream');

module.exports = function sol2abi(source, cb) {
  const solc = spawn('solc', ['--combined-json=abi']);
  const str = new Readable();

  str.pipe(solc.stdin);

  solc.stdout.on('data', data => {
    const raw = JSON.parse(data.toString());
    const abi = Object.keys(raw.contracts).reduce((x, k) => {
      x[k.match(/\<stdin\>\:(.*)/)[1]] = JSON.parse(raw.contracts[k].abi);
      return x;
    }, {});

    cb(null, abi);
  });

  str.push(source);
  str.push(null);
};
