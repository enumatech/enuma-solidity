import { HelloWorld as Contract } from './HelloWorld.sol';

// import { HelloWorld as Contract } from './HelloWorld';

async function main() {
  const address = '0x92Af73C8B7285CEB47EEB313af755485Fb4Abe1D';
  const contract = new Contract(address);

  const result = await contract.Hi().call();
  console.log(result);

  // const from = '0x723fA5162eef1CDe6EdFf5ca2E96A9F098f8c9B1';
  // const receipt = await contract.Hi().send({ from });
  // console.log(receipt);
}

main().catch(console.error);
