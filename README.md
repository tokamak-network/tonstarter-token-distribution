# TOS Token Distribution Contracts


## Available Functionality

### Build Contracts

`npx hardhat compile`

### Deploy to Ethereum

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:
To deploy DAOVault,
`npx hardhat run --network rinkeby scripts/deploy_1_dao.js`

To deploy,
`npx hardhat run --network rinkeby scripts/deploy.js`

### Verify on Etherscan

Using the [hardhat-etherscan plugin](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html), add Etherscan API key to `hardhat.config.ts`, then run:
`npx hardhat verify --network rinkeby --contract contracts/SimpleVault.sol:SimpleVault 0x380b3483B48240879C2f9Fd62166815899a1B015 "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "DAOVault"`


`npx hardhat verify --network rinkeby 0x32E4Ec51C333EaDA58704e3843EdEA3453c123cF "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "20"`

npx hardhat verify --network rinkeby
### lint
`npm run lint:write`
`npm run prettier:solidity`

### To generate documents by solidity-docgen
`npm run docify`


### To generate UML by sol2uml
`sol2uml ./contracts`

