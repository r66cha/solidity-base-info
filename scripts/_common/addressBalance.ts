import { network } from 'hardhat';
import { NETWORK } from './constants.js';

async function main() {
  const { ethers } = await network.connect({ network: NETWORK.localhost });
  const accounts = await ethers.getSigners();
  const accountAddress = '...'; // Set address
  const accountBalanceWei = await ethers.provider.getBalance(accounts[0]); // Or accountAddress
  const accountBalanceETH = ethers.formatEther(accountBalanceWei);

  console.log(
    `Account ${accounts[0].address}\nBalance: ${Number(
      accountBalanceETH
    ).toFixed(4)} ETH`
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
