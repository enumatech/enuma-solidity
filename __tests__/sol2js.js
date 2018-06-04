const path = require('path');
const fs = require('fs');
const sol2js = require('../');

function testFixture(name) {
  const fixture = path.join(__dirname, '../__fixtures__/', `${name}.sol`);
  const sol = fs.readFileSync(fixture, 'utf8');

  test(name, done => {
    sol2js(sol, 'ws://localhost:7545', (err, js) => {
      expect(js).toMatchSnapshot();
      done();
    });
  });
}

testFixture('HelloWorld');
