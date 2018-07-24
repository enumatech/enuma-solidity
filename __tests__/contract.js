const Client = require('../src/client');
const solc = require('../src/solc');
const { encodeFunctionSignature } = require('../src/utils');

const client = new Client('http://localhost:8545');
const contractSource = `pragma solidity ^0.4.23;

contract HelloWorld {
  function Hi() pure public returns(string) {
    return "Hello World";
  }
}`;

test('HelloWorld contract', async () => {
  const accounts = await client.call('eth_accounts');
  const account = accounts[0];
  const { HelloWorld: contract } = await solc(contractSource, ['abi', 'bin']);

  const address = await client.call('eth_sendTransaction', [
    {
      from: account,
      data: '0x' + contract.bin,
      gas: '0x' + Number(1000000).toString(16)
    }
  ]);

  const receipt = await client.call('eth_getTransactionReceipt', [address]);
  expect(receipt.from).toEqual(account);

  const result = await client.call('eth_call', [
    {
      from: accounts[1],
      to: receipt.contractAddress,
      data: encodeFunctionSignature('Hi()')
    },
    'latest'
  ]);
  expect(result).toEqual(
    '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000'
  );
});
