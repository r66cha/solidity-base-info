import type { HardhatUserConfig } from 'hardhat/config';
import 'dotenv/config';
import hardhatToolboxMochaEthersPlugin from '@nomicfoundation/hardhat-toolbox-mocha-ethers';
import { configVariable } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: '0.8.28',
      },
      production: {
        version: '0.8.28',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },

  networks: {
    mainnet: {
      type: 'http',
      chainType: 'l1',
      chainId: 1,
      url: configVariable('MAINNET_RPC_URL'),
      accounts: [configVariable('MM_PRIVATE_KEY')],
    },
    hardhatMainnet: {
      type: 'edr-simulated',
      chainType: 'l1',
    },
    hardhatOp: {
      type: 'edr-simulated',
      chainType: 'op',
    },
    sepolia: {
      type: 'http',
      chainType: 'l1',
      chainId: 11155111,
      url: configVariable('SEPOLIA_RPC_URL'),
      accounts: [configVariable('MM_PRIVATE_KEY')],
    },
    'arbitrum-sepolia': {
      type: 'http',
      chainType: 'op',
      chainId: 421614,
      url: configVariable('ARBITRUM_SEPOLIA_RPC_URL'),
      accounts: [configVariable('MM_PRIVATE_KEY')],
    },
    localhost: {
      type: 'http',
      url: 'http://127.0.0.1:8545',
    },
  },
  verify: {
    etherscan: {
      apiKey: configVariable('ETHERSCAN_API_KEY'),
    },
  },
};

export default config;
