import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../../constants.js';

async function main() {
  const { ethers } = await network.connect({ network: 'localhost' });
  const [signer, acc2] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);

  const tx = await contract.connect(acc2).pay({
    value: ethers.parseEther('1.24'),
  });
  await tx.wait();

  console.log(`Paid transaction hash: ${tx.hash}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
