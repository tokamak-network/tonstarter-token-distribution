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
  let tx2 = await liquidityVault.allocateAmount(
        1,
        utils.parseUnits(process.env.LiquidityVault_TGE1_AMOUNT + "." + "0".repeat(18), 18)
    );
  console.log("LiquidityVault allocateAmount tx.hash ", tx2.hash );

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  let tx3 = await marketingVault.allocateAmount(
        1,
        utils.parseUnits(process.env.MarketingVault_TGE1_AMOUNT + "." + "0".repeat(18), 18)
    );
  console.log("MarketingVault allocateAmount tx.hash ", tx3.hash );


  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  let tx1 = await airdropVault.allocateAmountTGE(
        utils.parseUnits(process.env.AirdropVault_TGE1_AMOUNT + "." + "0".repeat(18), 18)
    );
  console.log("AirdropVault allocateAmountTGE tx.hash ", tx1.hash );

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
