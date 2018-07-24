#! /usr/bin/env node

const path = require('path');
const sol2js = require('./');

async function main() {
  const cwd = process.cwd();
  const filepath = path.join(cwd, process.argv[2]);
  const js = await sol2js(filepath, { provider: process.argv[3] });

  console.log(js);
}

main().catch(console.error);
