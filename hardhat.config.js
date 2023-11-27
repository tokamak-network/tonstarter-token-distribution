require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      gas: 9500000,
      gasMultiplier: 100,
      blockGasLimit: 124500000,
      accounts: {
        mnemonic: process.env.MNEMONIC_HARDHAT,
        count: 30,
        initialIndex: 0,
        accountsBalance: '10000000000000000000000',
      },
    },
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC_HARDHAT,
        count: 30,
        initialIndex: 0,
        accountsBalance: '10000000000000000000000',
      },
      chainId: 31337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.InfuraKey}`,
      accounts: [
          `${process.env.ACCOUNT0_PK}`,
          `${process.env.ACCOUNT1_PK}`,
          `${process.env.ACCOUNT2_PK}`
          ],
      gasMultiplier: 1.25,
      gasPrice: 10000000000,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.InfuraKey}`,
      accounts: [
          `${process.env.ACCOUNT0_PK}`,
          `${process.env.ACCOUNT1_PK}`,
          `${process.env.ACCOUNT2_PK}`
          ],
      // gasMultiplier: 1.25,
      // gasPrice: 10000000000,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.InfuraKey}`,
      accounts: [
          `${process.env.TONSTARTER_DEPLOYER_PK}`
          ],
      gasMultiplier: 1.25,
      gasPrice: 35000000000
    },
    holesky: {
      url: `https://ethereum-holesky.publicnode.com`,
      accounts: [
          `${process.env.ACCOUNT0_PK}`,
          `${process.env.ACCOUNT1_PK}`,
          `${process.env.ACCOUNT2_PK}`
          ],
      chainId: 17000,
      // gasMultiplier: 1.25,
      // gasPrice: 10000000000,
    },
  },
  // etherscan: {
    // apiKey: `${process.env.APIKey}`,
  // },
  etherscan: {
    apiKey: {
        mainnet: `${process.env.APIKey}`,
        rinkeby: `${process.env.APIKey}`,
        goerli: `${process.env.APIKey}`,
        holesky: `${process.env.APIKey}`,
    },
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io/"
        }
      }
    ]
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

