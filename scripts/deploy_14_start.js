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

// date 현재시간이 한국 시간인지 확인

async function main() {

  const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  const liquidityVault = await ethers.getContractAt("DesignedVault", LiquidityVault);
  let tx1 = await liquidityVault.start();
  console.log("LiquidityVault start tx.hash ", tx1.hash );

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  let tx2 = await marketingVault.start();
  console.log("MarketingVault start tx.hash ", tx2.hash );


  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const initialContributorVault = await ethers.getContractAt("DesignedVault", InitialContributorVault);
  let tx3 = await initialContributorVault.start();
  console.log("InitialContributorVault start tx.hash ", tx2.hash );

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
