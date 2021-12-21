# TOS TOKEN Distribution


## Deployed on Mainnet

* "TOS": "0x409c4D8cd5d2924b9bc5509230d16a61289c8153"

* "DAOVault": "0xBedE575486e1F103fbe258a00D046F09e837fA17"

* "LiquidityMiningVault": "0xe5d9B1Cb200718286D7C88e6AA178702C8befE9D" => "0xE8960d506fEC3ec3E2736BF72B495f1EC5a63Cc6"

* "LiquidityVault": "0xA13EEC91B9e0ee4Cf96D8040B3ECC729a37882Be"

* "InitialContributorVault": "0x14dE03D4629c9c4D3bfc38f222B03AdA675f64b1"

* "MarketingVault": "0xb9845e926256DCd54DE112E06DAA49F53B4f4830"

* "AirdropVault": "0x0620492BAbe0a2cE13688025F8b783B8d6c28955"


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
