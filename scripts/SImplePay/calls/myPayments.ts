import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../_CONST/constants.js';
import { NETWORK } from '../_CONST/constants.js';

async function main() {
  const { ethers } = await network.connect({ network: NETWORK.localhost });
  const [signer, acc2] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);

  const accountAddress = signer.address;

  const payments = await contract.connect(signer).showMyPayments();
  const accountBalance = await ethers.provider.getBalance(accountAddress);

  let totalAmount: number = 0;

  if (payments.length > 0) {
    console.log(`Payments for account: ${accountAddress}\n`);
    for (const [i, p] of payments.entries()) {
      const date = new Date(Number(p.timestamp) * 1000).toLocaleString();
      let amount = ethers.formatEther(p.amount);
      console.log(`
            # Payment №${i + 1}\nTime: ${date}\nAmount: ${amount} ETH
            ---
            `);
      totalAmount += Number(amount);
    }
    console.log(`Total amount: ${totalAmount} ETH\n`);
  } else {
    console.log(`No payments for account: ${accountAddress}\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
