const Client = require('../src/client');
const solc = require('../src/solc');
const { sleep, encodeFunctionSignature } = require('../src/utils');

const client = new Client('http://localhost:8545');
let accounts = [];

beforeAll(async () => {
  accounts = await client.call('eth_accounts');
});

test('HelloWorld contract', async () => {
  const source = `pragma solidity ^0.4.23;

contract HelloWorld {
  function Hi() pure public returns(string) {
    return "Hello World";
  }
}`;

  const account0 = accounts[0];
  const { HelloWorld: contract } = await solc(source, ['abi', 'bin']);

  const tx = await client.call('eth_sendTransaction', [
    {
      from: account0,
      data: '0x' + contract.bin,
      gas: '0x' + Number(1000000).toString(16)
    }
  ]);

  let receipt = null;
  while (!receipt) {
    await sleep(100);
    receipt = await client.call('eth_getTransactionReceipt', [tx]);
  }

  expect(receipt.from).toEqual(account0);
  const { contractAddress } = receipt;

  const result = await client.call('eth_call', [
    {
      from: accounts[1],
      to: contractAddress,
      data: encodeFunctionSignature('Hi()')
    },
    'latest'
  ]);
  expect(result).toEqual(
    '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000'
  );

  const tx1 = await client.call('eth_sendTransaction', [
    {
      from: account0,
      to: contractAddress,
      data: encodeFunctionSignature('Hi()'),
      gas: '0x' + Number(100000).toString(16)
    }
  ]);
  const receipt1 = await client.call('eth_getTransactionReceipt', [tx1]);
  expect(tx1).not.toBeNull();
  expect(receipt1.from).toEqual(account0);
});

test('SimpleStorage contract', async () => {
  const source = `pragma solidity ^0.4.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}`;

  const account0 = accounts[0];
  const { SimpleStorage: contract } = await solc(source, ['abi', 'bin']);
  const tx = await client.call('eth_sendTransaction', [
    {
      from: account0,
      data: '0x' + contract.bin,
      gas: '0x' + Number(1000000).toString(16)
    }
  ]);

  expect(tx).not.toBeNull();
});
