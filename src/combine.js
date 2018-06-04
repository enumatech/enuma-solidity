const path = require('path');
const fs = require('fs');

const readFile = filepath =>
  new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });

const getPragmaRegx = () => /(pragma solidity (.+?);)/g;
const getImportRegx = () => /import ['"](.+?)['"];/g;

module.exports = async function combine(filepath) {
  const source = await readFile(filepath);
  const importRegx = getImportRegx();

  let m = null;
  const replaces = [];

  while ((m = importRegx.exec(source))) {
    const importPath = path.resolve(path.dirname(filepath), m[1]);
    let importSource = await combine(importPath, true);

    importSource = importSource.replace(getPragmaRegx(), '').trim();
    replaces.push(importSource);
  }

  let i = 0;
  const combined = source.replace(getImportRegx(), () => replaces[i++]);

  return combined;
};
