import { network } from 'hardhat';

async function main() {
  const { ethers } = await network.connect({ network: 'localhost' });
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory('Sign', signer);
  const contractSign = await contractFactory.deploy();
  await contractSign.waitForDeployment();
  console.log(contractSign);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
