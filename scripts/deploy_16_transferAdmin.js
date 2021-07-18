// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require('dotenv').config()
const save = require("./save_deployed");
const loadDeployed = require("./load_deployed");
const utils = ethers.utils;
const { printGasUsedOfUnits } = require("./log_tx");
// date 현재시간이 한국 시간인지 확인

async function main() {

  const DAOVault = loadDeployed(process.env.NETWORK, "DAOVault");
  const daoVault = await ethers.getContractAt("SimpleVault", DAOVault);
  let tx = await daoVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("DAOVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('DAOVault transferAdmin',tx);


  const LiquidityMiningVault = loadDeployed(process.env.NETWORK, "LiquidityMiningVault");
  const liquidityMiningVault = await ethers.getContractAt("SimpleVault", LiquidityMiningVault);
   tx = await liquidityMiningVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("LiquidityMiningVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('LiquidityMiningVault transferAdmin',tx);

  const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  const liquidityVault = await ethers.getContractAt("DesignedVault", LiquidityVault);
  tx = await liquidityVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("LiquidityVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('LiquidityVault transferAdmin',tx);

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  tx = await marketingVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("MarketingVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('MarketingVault transferAdmin',tx);

  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const initialContributorVault = await ethers.getContractAt("DesignedVault", InitialContributorVault);
  tx = await initialContributorVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("InitialContributorVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('InitialContributorVault transferAdmin',tx);

  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  tx = await airdropVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("AirdropVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('AirdropVault transferAdmin',tx);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
