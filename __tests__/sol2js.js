const path = require('path');
const sol2js = require('../src/sol2js');

function testFixture(name) {
  const filepath = path.join(__dirname, '../__fixtures__/', `${name}.sol`);

  test(name, done => {
    sol2js(filepath, { provider: 'ws://localhost:7545' }).then(js => {
      expect(js).toMatchSnapshot();
      done();
    });
  });
}

testFixture('HelloWorld');

testFixture('Token');

testFixture('StandardToken');

testFixture('Overloading');
