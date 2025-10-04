import { network } from 'hardhat';
import CounterArtifact from '../artifacts/contracts/Counter.sol/Counter.json';

async function currentBalance(address: string, msg: string = '') {
  const { ethers } = await network.connect({
    network: 'localhost',
  });

  const rawBalance = await ethers.provider.getBalance(address);
  console.log(msg, rawBalance);
}

async function main() {
  const { ethers } = await network.connect({
    network: 'localhost',
  });

  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

  const [signer, acc2] = await ethers.getSigners();
  //   const tx = {
  //     to: contractAddress,
  //     value: ethers.parseEther('1'),
  //   };

  //   const txSend = await acc2.sendTransaction(tx);
  //   await txSend.wait();

  //   await currentBalance(contractAddress, 'Contract balance:');
  //   await currentBalance(acc2.address, 'Account2 balance:');

  const counterContract = new ethers.Contract(
    contractAddress,
    CounterArtifact.abi,
    signer
  );

  await counterContract.inc();
  const res = await counterContract.getIncNum();
  console.log(res);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
