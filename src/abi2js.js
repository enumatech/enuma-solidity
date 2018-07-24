const _ = require('lodash');
const docTypes = require('./doc-types');
const { encodeFunctionSignature } = require('./utils');

function fn2js(fn) {
  const signature = encodeFunctionSignature(fn);

  const paramDocs = fn.inputs
    .map(x => `* @param {${docTypes[x.type]}} ${x.name}`)
    .join('\n');

  const returnDocs = fn.outputs
    .map(x => `* @return {${docTypes[x.type]}}`)
    .join('\n');

  const validates = fn.inputs
    .map(
      x =>
        `validators.${x.type}(${x.name}, '${fn.name}: ${x.name} must be ${
          x.type
        }')`
    )
    .join('\n');

  const args = fn.inputs.map(x => x.name).join(', ');

  return `
  ${paramDocs || returnDocs ? `/**\n${paramDocs}\n${returnDocs}*/` : ''}
  ${fn.name}(${args}) {
    validators.true(arguments.length === ${fn.inputs.length});
    ${validates}
    return this._contract.methods['${signature}'](${args});
  }
  `;
}

// http://solidity.readthedocs.io/en/v0.4.21/contracts.html#function-overloading
function overloadingFn2js(name, fns) {
  const types = fns.map(x => x.inputs.map(i => i.type));
  const signatures = fns.map(encodeFunctionSignature);

  return `${name}(...args) {
    const inputs = ${JSON.stringify(types)};
    let match = -1;

    for(let i = 0, l = inputs.length; i++; i < l) {
      const input = inputs[0];
      if(input.length === args.length) {
        match = i;
        break;
      }
    }

    if(match >= 0) {
      const signatures = ${JSON.stringify(signatures)};
      return this._contract.methods[signatures[match]](...args);
    }

    throw new Error('argument error');
  }
`;
}

function contract2js(name, contract) {
  const fns = contract.filter(x => x.type === 'function');

  const overloadingFns = _.keys(
    _.pickBy(_.groupBy(fns, x => x.name), x => x.length > 1)
  );

  return `export class ${name} {

  /**
   * @param {string} address
   */
  constructor(address) {
    validators.true(arguments.length === 1);
    validators.address(address, 'create contract with valid address');

    this._contract = new web3.eth.Contract(${JSON.stringify(
      contract
    )}, address);
  }

  ${fns
    .filter(x => !_.includes(overloadingFns, x.name))
    .map(fn2js)
    .join('\n')}
  ${overloadingFns
    .map(x => overloadingFn2js(x, fns.filter(f => x === f.name)))
    .join('\n')}
}`;
}

module.exports = function abi2js(contracts, provider) {
  if (!provider) throw new Error('provider not specified');

  return `const Web3 = require('enuma-solidity/web3');
const validators = require('enuma-solidity/validators');

const web3 = new Web3(${JSON.stringify(provider)});

${Object.keys(contracts)
    .map(k => contract2js(k, contracts[k].abi))
    .join('\n')}`;
};
