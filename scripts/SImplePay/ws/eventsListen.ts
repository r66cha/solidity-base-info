import { SIMPLE_PAY_ADDRESS } from '../_CONST/constants.js';
import SimplePayABI from '../../../artifacts/contracts/SimplePay.sol/SimplePay.json';
import { ethers } from 'ethers';
import { WS } from '../_CONST/constants.js';
import { EVENT } from '../_CONST/constants.js';

async function main() {
  const provider = new ethers.WebSocketProvider(WS.localhost);

  const contract = new ethers.Contract(
    SIMPLE_PAY_ADDRESS,
    SimplePayABI.abi,
    provider
  );

  console.log('Listening for events...');

  contract.on(EVENT.receive, (addr: string, _str: string) => {
    console.log(`Receive: ${addr}, ${_str}`);
  });

  contract.on(EVENT.fallback, (addr: string, _str: string) => {
    console.log(`Fallback: ${addr}, ${_str}`);
  });

  contract.on(EVENT.pay, (addr: string, timestamp: bigint, value: bigint) => {
    console.log(
      `Pay: ${addr}, ${new Date(
        Number(timestamp) * 1000
      ).toLocaleString()}, ${ethers.formatEther(value)} ETH`
    );
  });

  contract.on(
    EVENT.withdraw,
    (addr: string, to: string, timestamp: bigint, value: bigint) => {
      console.log(
        `Withdraw: ${addr}, ${to}, ${new Date(
          Number(timestamp) * 1000
        ).toLocaleString()}, ${ethers.formatEther(value)} ETH`
      );
    }
  );
}

main().catch(console.error);
