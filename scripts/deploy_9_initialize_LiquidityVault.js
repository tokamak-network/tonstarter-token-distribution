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

async function main() {

  // uint256 _totalAllocatedAmount,
  //       uint256 _totalClaims,
  //       uint256 _totalTgeCount,
  //       uint256 _startTime,
  //       uint256 _periodTimesPerClaim

  let inputInfo = {
    name: 'LiquidityVault',
    totalAllocatedAmount: 20000000,
    totalClaims: 13,
    totalTgeCount: 1,
    startTime: '2021-08-02 00:00:00',
    periodTimesPerClaim: ,
    claimer: '',
  }

  let deployInfo = {
      name : "LiquidityVault",
      address : ""
    }

  console.log("----------- Initialize  ", deployInfo.name );
  // const tostoken = loadDeployed(process.env.NETWORK, "TOS");
  // const DAOVault = loadDeployed(process.env.NETWORK, "DAOVault");
  // const LiquidityMiningVault = loadDeployed(process.env.NETWORK, "LiquidityMiningVault");
  // const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  // const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  // const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  // const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");


  const tos = await ethers.getContractAt("TOS", tostoken);

  let balance_DAOVault = await tos.balanceOf(DAOVault);
  console.log('balance_DAOVault' , utils.formatUnits(balance_DAOVault.toString(), 18));

  let balance_LiquidityMiningVault = await tos.balanceOf(LiquidityMiningVault);
  console.log('balance_LiquidityMiningVault' , utils.formatUnits(balance_LiquidityMiningVault.toString(), 18));

  let balance_LiquidityVault = await tos.balanceOf(LiquidityVault);
  console.log('balance_LiquidityVault' ,utils.formatUnits(balance_LiquidityVault.toString(), 18));

   let balance_InitialContributorVault = await tos.balanceOf(InitialContributorVault);
  console.log('balance_InitialContributorVault' , utils.formatUnits(balance_InitialContributorVault.toString(), 18));

  let balance_MarketingVault = await tos.balanceOf(MarketingVault);
  console.log('balance_MarketingVault' , utils.formatUnits(balance_MarketingVault.toString(), 18));

  let balance_AirdropVault = await tos.balanceOf(AirdropVault);
  console.log('balance_AirdropVault' , utils.formatUnits(balance_AirdropVault.toString(), 18));

  let totalSupply = await tos.totalSupply();
  console.log('TOS totalSupply' , utils.formatUnits(totalSupply.toString(), 18));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
