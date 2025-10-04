import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../../constants.js';

async function main() {
  const { ethers } = await network.connect({ network: 'localhost' });
  const [signer, acc2] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);

  const balance = await contract.connect(acc2).showBalance();
  console.log(`SimplePay contract balance: ${ethers.formatEther(balance)} ETH`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
