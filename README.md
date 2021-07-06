# TOS Token Distribution Contracts


## Available Functionality

### Build Contracts

`npx hardhat compile`

### Deploy to Ethereum

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:

`npx hardhat run --network rinkeby scripts/deploy_1_dao.js`

`npx hardhat run --network rinkeby scripts/deploy_2_liquidityMining.js`

`npx hardhat run --network rinkeby scripts/deploy_3_liquidity.js`

`npx hardhat run --network rinkeby scripts/deploy_4_InitialContributor.js`

`npx hardhat run --network rinkeby scripts/deploy_5_Marketing.js`

`npx hardhat run --network rinkeby scripts/deploy_6_Airdrop.js`

### Verify on Etherscan

Using the [hardhat-etherscan plugin](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html), add Etherscan API key to `hardhat.config.ts`, then run:

`npx hardhat verify --network rinkeby --contract contracts/SimpleVault.sol:SimpleVault 0x380b3483B48240879C2f9Fd62166815899a1B015 "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "DAOVault"`

* DAO Vault
`npx hardhat verify --network rinkeby --contract contracts/vaults/SimpleVault.sol:SimpleVault {볼트주소} "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "{name}"`

* Liquidity Mining Vault
`npx hardhat verify --network rinkeby --contract contracts/vaults/SimpleVault.sol:SimpleVault {볼트주소} "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "{name}"`

* Liquidity  Vault
`npx hardhat verify --network rinkeby --contract contracts/LiquidityVault.sol:LiquidityVault {볼트주소} "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "{MaxInputOnceForWhitelist}"`

* Initial ContributorVault  Vault
`npx hardhat verify --network rinkeby --contract contracts/InitialContributorVault.sol:InitialContributorVault {볼트주소} "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "{MaxInputOnceForWhitelist}"`

* MarketingVault  Vault
`npx hardhat verify --network rinkeby --contract contracts/MarketingVault.sol:MarketingVault {볼트주소} "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "{MaxInputOnceForWhitelist}"`


* AirdropVault  Vault
`npx hardhat verify --network rinkeby --contract contracts/AirdropVault.sol:AirdropVault {볼트주소} "0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd" "{MaxInputOnceForWhitelist}"`


### lint
`npm run lint:write`
`npm run prettier:solidity`

### To generate documents by solidity-docgen
`npm run docify`


### To generate UML by sol2uml
`sol2uml ./contracts`
