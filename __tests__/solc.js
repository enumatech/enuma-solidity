const solc = require('../src/solc');

const source = `pragma solidity ^0.4.23;

contract HelloWorld {
  function Hi() pure public returns(string) {
    return "Hello World";
  }
}`;

test('default', async () => {
  expect(await solc(source)).toMatchSnapshot();
});

test('bin', async () => {
  expect(await solc(source, ['bin'])).toMatchSnapshot();
});

test('abi,bin', async () => {
  expect(await solc(source, ['abi,bin'])).toMatchSnapshot();
});
