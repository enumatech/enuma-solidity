#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const sol2abi = require('./sol2abi');
const abi2js = require('./abi2js');

const target = path.join(process.cwd(), process.argv[2]);

const source = fs.readFileSync(target, 'utf8');

sol2abi(source, (err, abi) => {
  if (err) throw err;

  console.log(abi2js(abi, process.argv[3]));
});
