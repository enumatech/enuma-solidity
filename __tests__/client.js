const Client = require('../src/client');

const client = new Client('http://localhost:8545');

test('call', async () => {
  const accounts = await client.call('eth_accounts');
  const balance = await client.call('eth_getBalance', [accounts[0], 'latest']);

  expect(accounts.length).toBe(2);
  expect(balance).not.toBeNull();
});

test('error', done => {
  client.call('method_not_found').catch(err => {
    expect(err.message).toMatch(/not available/);
    done();
  });
});
