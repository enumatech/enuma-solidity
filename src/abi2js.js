const docTypes = require('./doc-types');

function fn2js(fn) {
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
    return this._contract.methods.${fn.name}(${args});
  }
  `;
}

function contract2js(name, contract) {
  const fns = contract.filter(x => x.type === 'function');

  return `export class ${name} {

  /**
   * @param {string} address
   */
  constructor(address){
    validators.true(arguments.length === 1);
    validators.address(address);

    this._contract = new web3.eth.Contract(${JSON.stringify(
      contract
    )}, address);
  }

  ${fns.map(fn2js).join('\n')}
}`;
}

module.exports = function abi2js(abi, provider) {
  if (!provider) throw new Error('provider not specified');

  // todo: utils path resolve fix
  return `import Web3 from 'web3';
const validators = require('../src/validators');

const web3 = new Web3(${JSON.stringify(provider)});

${Object.keys(abi)
    .map(k => contract2js(k, abi[k]))
    .join('\n')}`;
};
