
import { HardhatUserConfig } from 'hardhat/config';
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://endpoints.omniatech.io/v1/eth/sepolia/public";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat', 
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan:{
    apiKey: {
      sepolia:`${process.env.API_KEY}`,
    }
  },
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
