export const SIMPLE_PAY_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
export enum NETWORK {
  localhost = 'localhost',
}
export enum WS {
  localhost = 'ws://127.0.0.1:8545',
}
export enum EVENT {
  pay = 'Pay',
  withdraw = 'Withdraw',
  receive = 'Receive',
  fallback = 'Fallback',
}
