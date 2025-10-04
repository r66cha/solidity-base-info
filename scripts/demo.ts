import { network } from 'hardhat';

async function main() {
  const { ethers } = await network.connect({
    network: 'hardhatOp',
    chainType: 'op',
  });

  const accounts = await ethers.getSigners();
  console.log('Accounts:');
  accounts.forEach((acc) => console.log(acc.address));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
