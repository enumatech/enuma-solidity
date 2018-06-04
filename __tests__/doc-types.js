const docTypes = require('../src/doc-types');

test('docTypes', () => {
  expect(docTypes).toMatchSnapshot();
});
