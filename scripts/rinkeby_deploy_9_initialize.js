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


  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  let tx4 = await airdropVault.initialize(
        utils.parseUnits(inputInfo_AirdropVault.totalAllocatedAmount + "." + "0".repeat(18), 18),
        parseInt(inputInfo_AirdropVault.totalTgeCount),
        inputInfo_AirdropVault.unixTimestamp,
        parseInt(inputInfo_AirdropVault.periodTimesPerClaim)
    );
  console.log("AirdropVault initialize tx.hash ", tx4.hash );
  printGasUsedOfUnits('AirdropVault initialize ',tx4);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
