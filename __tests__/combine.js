const path = require('path');
const combine = require('../src/combine');

test('no import', done => {
  combine(path.join(__dirname, '../__fixtures__/SafeMath.sol')).then(source => {
    expect(source).toMatchSnapshot();
    done();
  });
});

test('single import', done => {
  combine(path.join(__dirname, '../__fixtures__/Token.sol')).then(source => {
    expect(source).toMatchSnapshot();
    done();
  });
});
