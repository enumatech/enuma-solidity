#! /usr/bin/env node

const path = require('path');
const sol2js = require('./');

async function main() {
  const filepath = path.join(process.cwd(), process.argv[2]);
  const js = await sol2js(filepath, { provider: process.argv[3] });

  console.log(js);
}

main().catch(console.error);
