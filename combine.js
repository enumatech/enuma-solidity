#! /usr/bin/env node

const path = require('path');
const combine = require('./src/combine');

async function main() {
  const filepath = path.join(process.cwd(), process.argv[2]);
  const sol = await combine(filepath);

  console.log(sol);
}

main().catch(console.error);
