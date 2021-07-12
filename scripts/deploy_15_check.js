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
  let getTgeInfos = await liquidityVault.getTgeInfos(1) ;

  console.log("LiquidityVault getTgeInfos(1) ", getTgeInfoMap(getTgeInfos));

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  let getTgeInfos3 = await marketingVault.getTgeInfos(1) ;

  console.log("MarketingVault getTgeInfos(1) ", getTgeInfoMap(getTgeInfos3));

  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  let getTgeInfos4 = await airdropVault.getTgeInfos(1) ;

  console.log("AirdropVault getTgeInfos(1) ", getTgeInfoMap(getTgeInfos4));


  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const initialContributorVault = await ethers.getContractAt("DesignedVault", InitialContributorVault);
  let startedByClaimer = await initialContributorVault.startedByClaimer() ;
  let oneClaimAmountByClaimer = await initialContributorVault.oneClaimAmountByClaimer() ;

  console.log("InitialContributorVault startedByClaimer ", startedByClaimer );
  console.log("InitialContributorVault oneClaimAmountByClaimer ",  utils.formatUnits(oneClaimAmountByClaimer.toString(),18));

}


function getTgeInfoMap (data){
  return {
    allocated : data.allocated,
    started : data.started,
    allocatedAmount : utils.formatUnits(data.allocatedAmount.toString(),18),
    claimedCount : data.claimedCount.toString(),
    amount : utils.formatUnits(data.claimedCount.toString(),18),
    whitelist : data.whitelist
  };
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
