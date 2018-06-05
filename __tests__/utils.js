const utils = require('../src/utils');

test('encodeFunctionSignature', () => {
  expect(utils.encodeFunctionSignature('Hi()')).toEqual('0x9a6e22f7');
  expect(utils.encodeFunctionSignature('myMethod(uint256,string)')).toEqual(
    '0x24ee0097'
  );

  expect(utils.encodeFunctionSignature({ inputs: [], name: 'Hi' })).toEqual(
    '0x9a6e22f7'
  );
  expect(
    utils.encodeFunctionSignature({
      inputs: [{ type: 'uint256' }, { type: 'string' }],
      name: 'myMethod'
    })
  ).toEqual('0x24ee0097');
});
