const path = require('path');
const combine = require('../src/combine');

function testFixture(name) {
  test(name, done => {
    combine(path.join(__dirname, `../__fixtures__/${name}.sol`)).then(
      source => {
        expect(source).toMatchSnapshot();
        done();
      }
    );
  });
}

testFixture('SafeMath');

testFixture('Token');

testFixture('StandardToken');
