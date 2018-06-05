const _ = require('lodash');
const Web3 = require('web3');

const web3 = new Web3();

// http://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#encodefunctionsignature

exports.encodeFunctionSignature = func =>
  _.isString(func)
    ? web3.utils.sha3(func).slice(0, 10)
    : web3.utils
        .sha3(`${func.name}(${func.inputs.map(x => x.type).join(',')})`)
        .slice(0, 10);
