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
  let tx2 = await liquidityVault.addWhitelist(1,
      [
        "0x3b9878ef988b086f13e5788ecab9a35e74082ed9",
        "0x865264b30eb29a2978b9503b8afe2a2dda33ed7e"
      ]);
  console.log("LiquidityVault addWhitelist tx.hash ", tx2.hash );

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  let tx3 = await marketingVault.addWhitelist(1,
      [
        "0xe68c794871c7a43369cab813a25f9c42f8195ac4",
        "0x865264b30eb29a2978b9503b8afe2a2dda33ed7e"
      ]);
  console.log("MarketingVault addWhitelist tx.hash ", tx3.hash );


  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  let tx1 = await airdropVault.addWhitelist(1,
      [
        "0x3b9878ef988b086f13e5788ecab9a35e74082ed9",
        "0xe68c794871c7a43369cab813a25f9c42f8195ac4",
        "0x865264b30eb29a2978b9503b8afe2a2dda33ed7e"
      ]);
  console.log("AirdropVault addWhitelist tx.hash ", tx1.hash );

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
