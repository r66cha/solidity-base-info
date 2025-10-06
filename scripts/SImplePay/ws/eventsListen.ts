import { SIMPLE_PAY_ADDRESS } from '../../common/constants.js';
import SimplePayABI from '../../../artifacts/contracts/SimplePay.sol/SimplePay.json';
import { ethers } from 'ethers';

async function main() {
  // Подключаемся к реальному WebSocket Hardhat Node
  const provider = new ethers.WebSocketProvider('ws://127.0.0.1:8545');

  // Контракт на этом же провайдере
  const contract = new ethers.Contract(
    SIMPLE_PAY_ADDRESS,
    SimplePayABI.abi,
    provider
  );

  console.log('Listening for events...');

  // Слушаем событие ReceiverAlert
  contract.on(
    'ReceiverAlert',
    (addr: string, timestamp: bigint, value: bigint) => {
      console.log(
        `ReceiverAlert: ${addr}, ${new Date(
          Number(timestamp) * 1000
        ).toLocaleString()}, ${ethers.formatEther(value)} ETH`
      );
    }
  );

  // Слушаем событие FallbackAlert
  contract.on(
    'FallbackAlert',
    (addr: string, timestamp: bigint, value: bigint) => {
      console.log(
        `FallbackAlert: ${addr}, ${new Date(
          Number(timestamp) * 1000
        ).toLocaleString()}, ${ethers.formatEther(value)} ETH`
      );
    }
  );
}

main().catch(console.error);
