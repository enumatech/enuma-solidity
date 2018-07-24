const _ = require('lodash');
const cryptoSha3 = require('crypto-js/sha3');

// https://github.com/ethereum/web3.js/blob/develop/lib/utils/sha3.js
function sha3(value) {
  return (
    '0x' +
    cryptoSha3(value, {
      outputLength: 256
    }).toString()
  );
}

exports.sha3 = sha3;

// http://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#encodefunctionsignature
exports.encodeFunctionSignature = func =>
  _.isString(func)
    ? sha3(func).slice(0, 10)
    : sha3(`${func.name}(${func.inputs.map(x => x.type).join(',')})`).slice(
        0,
        10
      );

exports.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// exports.hexToStr = hex => {
//   let str = '';
//   let i = 0;
//   const l = hex.length;
//   if (hex.substring(0, 2) === '0x') {
//     i = 2;
//   }

//   for (; i < l; i += 2) {
//     const code = parseInt(hex.substr(i, 2), 16);
//     str += String.fromCharCode(code);
//   }

//   return str;
// };
