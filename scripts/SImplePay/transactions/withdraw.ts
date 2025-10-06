import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../../common/constants.js';

async function main() {
  const { ethers } = await network.connect({ network: 'localhost' });
  const provider = await ethers.provider;
  const [signer, acc2] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);
  try {
    const tx = await contract.connect(signer).withdraw(signer.address);
    await tx.wait();
    const balanceWei = await provider.getBalance(signer.address);
    const balanceETH = await Number(ethers.formatEther(balanceWei)).toFixed(4);
    console.log(`Balance of acc ${signer.address}: ${balanceETH} ETH`);
  } catch (err: any) {
    console.log('Transaction reverted:', err.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
