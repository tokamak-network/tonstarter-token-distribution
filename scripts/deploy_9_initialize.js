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

  let inputInfo_LiquidityVault = {
    name: process.env.LiquidityVault_Name ,
    totalAllocatedAmount: process.env.LiquidityAllocate ,
    totalClaims: process.env.LiquidityVault_totalClaims,
    totalTgeCount: process.env.LiquidityVault_totalTgeCount,
    startTime: process.env.LiquidityVault_startTime,
    periodTimesPerClaim: process.env.periodTimesPerClaim,
    unixTimestamp: 0 ,
    claimer: '',
  }
  inputInfo_LiquidityVault.unixTimestamp = Math.floor(new Date(inputInfo_LiquidityVault.startTime).getTime()/1000);

  let inputInfo_InitialContributorVault = {
    name: process.env.InitialContributorVault_Name ,
    totalAllocatedAmount: process.env.InitialContributorAllocate ,
    totalClaims: process.env.InitialContributorVault_totalClaims,
    totalTgeCount: process.env.InitialContributorVault_totalTgeCount,
    startTime: process.env.InitialContributorVault_startTime,
    periodTimesPerClaim: process.env.periodTimesPerClaim,
    unixTimestamp: 0 ,
    claimer: '',
  }
  inputInfo_InitialContributorVault.unixTimestamp = Math.floor(new Date(inputInfo_InitialContributorVault.startTime).getTime()/1000);


  let inputInfo_MarketingVault = {
    name: process.env.MarketingVault_Name ,
    totalAllocatedAmount: process.env.MarketingFundAllocate ,
    totalClaims: process.env.MarketingVault_totalClaims,
    totalTgeCount: process.env.MarketingVault_totalTgeCount,
    startTime: process.env.MarketingVault_startTime,
    periodTimesPerClaim: process.env.periodTimesPerClaim,
    unixTimestamp: 0 ,
    claimer: '',
  }
  inputInfo_MarketingVault.unixTimestamp = Math.floor(new Date(inputInfo_MarketingVault.startTime).getTime()/1000);

  let inputInfo_AirdropVault = {
    name: process.env.AirdropVault_Name ,
    totalAllocatedAmount: process.env.AirdropAllocate ,
    totalClaims: process.env.AirdropVault_totalClaims,
    totalTgeCount: process.env.AirdropVault_totalTgeCount,
    startTime: process.env.AirdropVault_startTime,
    periodTimesPerClaim: process.env.periodTimesPerClaim,
    unixTimestamp: 0 ,
    claimer: '',
  }
  inputInfo_AirdropVault.unixTimestamp = Math.floor(new Date(inputInfo_AirdropVault.startTime).getTime()/1000);

  // console.log("----------- inputInfo_LiquidityVault  ", inputInfo_LiquidityVault );
  // console.log("----------- inputInfo_InitialContributorVault  ", inputInfo_InitialContributorVault );
  // console.log("----------- inputInfo_MarketingVault  ", inputInfo_MarketingVault );
  // console.log("----------- inputInfo_AirdropVault  ", inputInfo_AirdropVault );


  const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  const liquidityVault = await ethers.getContractAt("DesignedVault", LiquidityVault);
  let tx1 = await liquidityVault.initialize(
        utils.parseUnits(inputInfo_LiquidityVault.totalAllocatedAmount + "." + "0".repeat(18), 18),
        parseInt(inputInfo_LiquidityVault.totalClaims),
        parseInt(inputInfo_LiquidityVault.totalTgeCount),
        inputInfo_LiquidityVault.unixTimestamp,
        parseInt(inputInfo_LiquidityVault.periodTimesPerClaim)
    );
  console.log("LiquidityVault initialize tx.hash ", tx1.hash );
 /*
  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const initialContributorVault = await ethers.getContractAt("DesignedVault", InitialContributorVault);
  let tx2 = await initialContributorVault.initialize(
        utils.parseUnits(inputInfo_InitialContributorVault.totalAllocatedAmount + "." + "0".repeat(18), 18),
        parseInt(inputInfo_InitialContributorVault.totalClaims),
        parseInt(inputInfo_InitialContributorVault.totalTgeCount),
        inputInfo_InitialContributorVault.unixTimestamp,
        parseInt(inputInfo_InitialContributorVault.periodTimesPerClaim)
    );
  console.log("InitialContributorVault initialize tx.hash ", tx2.hash );

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  let tx3 = await marketingVault.initialize(
        utils.parseUnits(inputInfo_MarketingVault.totalAllocatedAmount + "." + "0".repeat(18), 18),
        parseInt(inputInfo_MarketingVault.totalClaims),
        parseInt(inputInfo_MarketingVault.totalTgeCount),
        inputInfo_MarketingVault.unixTimestamp,
        parseInt(inputInfo_MarketingVault.periodTimesPerClaim)
    );
  console.log("MarketingVault initialize tx.hash ", tx3.hash );


  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  let tx4 = await airdropVault.initialize(
        utils.parseUnits(inputInfo_AirdropVault.totalAllocatedAmount + "." + "0".repeat(18), 18),
        parseInt(inputInfo_AirdropVault.totalTgeCount),
        inputInfo_AirdropVault.unixTimestamp,
        parseInt(inputInfo_AirdropVault.periodTimesPerClaim)
    );
  console.log("AirdropVault initialize tx.hash ", tx4.hash );
  */
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
