import { network } from 'hardhat';

async function main() {
  const { ethers } = await network.connect({
    network: 'localhost',
  });

  const [signer] = await ethers.getSigners();

  const CounterComp = await ethers.getContractFactory('Counter', signer);
  const CounterCntr = await CounterComp.deploy();
  await CounterCntr.waitForDeployment();
  console.log(await CounterCntr.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
