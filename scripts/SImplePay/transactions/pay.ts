import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../_CONST/constants.js';
import { NETWORK } from '../_CONST/constants.js';

async function main() {
  const { ethers } = await network.connect({ network: NETWORK.localhost });
  const [signer, acc2] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);
  const amountETH = '2.35';
  const amoutWei = ethers.parseEther(amountETH);

  const tx = await contract.connect(acc2).pay({
    value: amoutWei,
  });
  await tx.wait();

  console.log(`Paid sum: ${amountETH} ETH`);
  console.log(`Paid transaction hash: ${tx.hash}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
