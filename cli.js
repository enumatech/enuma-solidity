#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const sol2js = require('./');

const target = path.join(process.cwd(), process.argv[2]);

const source = fs.readFileSync(target, 'utf8');

sol2js(source, process.argv[3], (err, js) => {
  if (err) throw err;
  console.log(js);
});
