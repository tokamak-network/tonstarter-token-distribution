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


  const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  const liquidityVault = await ethers.getContractAt("DesignedVault", LiquidityVault);
  let tx2 = await liquidityVault.addWhitelist(1,
      [
        process.env.claimer
      ]);
  console.log("LiquidityVault addWhitelist tx.hash ", tx2.hash );
  printGasUsedOfUnits('LiquidityVault addWhitelist',tx2);

  tx2 = await liquidityVault.setClaimer(process.env.claimer);
  console.log("LiquidityVault setClaimer tx.hash ", tx2.hash );
  printGasUsedOfUnits('LiquidityVault setClaimer',tx2);


  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  let tx3 = await marketingVault.addWhitelist(1,
      [
        process.env.claimer
      ]);
  console.log("MarketingVault addWhitelist tx.hash ", tx3.hash );
  printGasUsedOfUnits('MarketingVault addWhitelist',tx3);


  tx3 =  await marketingVault.setClaimer(process.env.claimer);
  console.log("MarketingVault setClaimer tx.hash ", tx3.hash );
  printGasUsedOfUnits('MarketingVault setClaimer',tx3);


  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const initialContributorVault = await ethers.getContractAt("DesignedVault", InitialContributorVault);
  tx3 =  await initialContributorVault.setClaimer(process.env.claimer);
  console.log("InitialContributorVault setClaimer tx.hash ", tx3.hash );
  printGasUsedOfUnits('InitialContributorVault setClaimer',tx3);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
