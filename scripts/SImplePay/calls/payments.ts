import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../../common/constants.js';

async function main() {
  const { ethers } = await network.connect({ network: 'localhost' });
  const [signer, acc2] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);

  const accountAddress = acc2.address;
  const accountBalance = await ethers.provider.getBalance(accountAddress);

  try {
    const payments = await contract
      .connect(signer)
      .showPayments(accountAddress);

    if (payments.length > 0) {
      let totalAmount: number = 0;

      console.log(`Payments for account: ${accountAddress}\n`);
      for (const [i, p] of payments.entries()) {
        const date = new Date(Number(p.timestamp) * 1000).toLocaleString();
        let amount = ethers.formatEther(p.amount);
        console.log(`
            # Payment №${i + 1}\n
            Time: ${date}\n
            Amount: ${amount} ETH
            ---
            `);
        totalAmount += Number(amount);
      }
      console.log(`Total amount: ${totalAmount} ETH\n`);
    } else {
      console.log(`No payments for account: ${accountAddress}\n`);
    }
    console.log(
      `Account ${accountAddress} balance: ${ethers.formatEther(
        accountBalance
      )} ETH\n`
    );
  } catch (err: any) {
    console.log('Transaction reverted:', err.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
