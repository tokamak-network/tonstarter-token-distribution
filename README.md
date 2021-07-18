# TOS Token Distribution


## Deployed on Mainnet

{
  "TOS": "0x1b481bca7156E990E2d90d1EC556d929340E9fC3",
  "DAOVault": "0x4F710Ca48E9D9E5b87Bc82eB56aF45fdE98177D8",
  "LiquidityMiningVault": "0x64eC7d20b04D43A13aBd14032B6C94AE13384f5A",
  "LiquidityVault": "0x61d5610f3Dd7B93f25B91A2EdF5DD99020Cd6B6b",
  "InitialContributorVault": "0x596868592b01Cc896DB7139BF0B25911138B121e",
  "MarketingVault": "0xAf4d492cc807CdB7fed60427f6742eff49ABc4d5",
  "AirdropVault": "0x49108acF8c4fD9b70eCfC0804CfB84DE6EF475Ce"
}
Tag: [deploy on mainnet](https://github.com/Onther-Tech/tonstarter-token-distribution/commit/1eac24c2c60c32ad9e4c977e5262abedc7b443a0)


##

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
