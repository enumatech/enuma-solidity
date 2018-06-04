const validators = require('../src/validators');

test('string', () => {
  expect(() => validators.string('1')).not.toThrow();
  expect(() => validators.string(1, 'string only')).toThrow(/string only/);
});

test('address', () => {
  expect(() =>
    validators.address('0x92Af73C8B7285CEB47EEB313af755485Fb4Abe1D')
  ).not.toThrow();

  expect(() => validators.address('test', 'address only')).toThrow(
    /address only/
  );
});
