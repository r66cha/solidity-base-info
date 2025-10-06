import { network } from 'hardhat';
import { NETWORK } from '../_CONST/constants.js';
import { CONTRACT } from '../../_common/constants.js';

async function main() {
  const { ethers } = await network.connect({ network: NETWORK.localhost });
  const [signer] = await ethers.getSigners();
  const contractF = await ethers.getContractFactory(CONTRACT.SimplePay, signer);
  // console.log(contractF);
  const contract = await contractF.deploy();
  await contract.waitForDeployment();
  console.log(contract);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
