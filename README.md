# TOS Token Distribution Contracts


## Available Functionality

### Build Contracts

`npx hardhat compile`

### Deploy to Ethereum

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:

To deploy,
`npx hardhat run --network rinkeby scripts/deploy.js`

### Verify on Etherscan

Using the [hardhat-etherscan plugin](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html), add Etherscan API key to `hardhat.config.ts`, then run:

`npx hardhat verify --network rinkeby --contract contracts/LiquidityVault.sol:LiquidityVault 0xc67c0BADB8f7837aC98d0151AD20DD0ef5380105 "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "10"`


### lint
`npm run lint:write`
`npm run prettier:solidity`

### To generate documents by solidity-docgen
`npm run docify`


### To generate UML by sol2uml
`sol2uml ./contracts`

