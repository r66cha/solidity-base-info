import { network } from 'hardhat';
import { SIMPLE_PAY_ADDRESS } from '../_CONST/constants.js';
import { NETWORK } from '../_CONST/constants.js';

async function main() {
  const { ethers } = await network.connect({ network: NETWORK.localhost });
  const [_, acc2] = await ethers.getSigners();

  const contract = await ethers.getContractAt('SimplePay', SIMPLE_PAY_ADDRESS);

  const amountETH = '1.05';
  const amoutWei = ethers.parseEther(amountETH);

  const data = ethers.hexlify(ethers.toUtf8Bytes('nonExistentFunction()'));

  const tx = await acc2.sendTransaction({
    to: SIMPLE_PAY_ADDRESS,
    value: amoutWei,
    data: data,
  });
  const receipt = await tx.wait();

  if (receipt) {
    console.log(`TX status: ${receipt?.status}`);
    for (const log of receipt.logs) {
      try {
        const parsed = contract.interface.parseLog(log);
        if (parsed) {
          console.log('Event name:', parsed.name);
          console.log('Args:', parsed.args);
        }
      } catch (err) {}
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
