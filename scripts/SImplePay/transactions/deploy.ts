import { network } from 'hardhat';

async function main() {
  const { ethers } = await network.connect({ network: 'localhost' });
  const [signer] = await ethers.getSigners();
  const contractF = await ethers.getContractFactory('SimplePay', signer);
  console.log(contractF);
  const contract = await contractF.deploy();
  await contract.waitForDeployment();
  console.log(contract);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
