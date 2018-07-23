const gethd = require('gethd');
const Client = require('../src/client');

const client = new Client('http://localhost:8545');

beforeAll(async () => {
  gethd.start();
  await gethd.waitForReady();
}, 10000);

afterAll(gethd.stop);

test('call', async () => {
  const accounts = await client.call('eth_accounts');
  const balance = await client.call('eth_getBalance', [accounts[0], 'latest']);

  expect(accounts.length).toBe(2);
  expect(balance).not.toBeNull();
});
