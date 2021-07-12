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

  console.log("----------- TOS.mint   ",  );
  const tostoken = loadDeployed(process.env.NETWORK, "TOS");
  const DAOVault = loadDeployed(process.env.NETWORK, "DAOVault");
  const LiquidityMiningVault = loadDeployed(process.env.NETWORK, "LiquidityMiningVault");
  const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");

  // console.log("tostoken:", tostoken);
  // console.log("DAOVault:", DAOVault);
  // console.log("LiquidityMiningVault:", LiquidityMiningVault);
  // console.log("LiquidityVault:", LiquidityVault);
  // console.log("InitialContributorVault:", InitialContributorVault);
  // console.log("MarketingVault:", MarketingVault);
  // console.log("AirdropVault:", AirdropVault);

  const tos = await ethers.getContractAt("TOS", tostoken);

 // await tos.mint(DAOVault, utils.parseUnits(process.env.DAOFundAllocate + "." + "0".repeat(18), 18));
  let balance_DAOVault = await tos.balanceOf(DAOVault);
  //console.log('balance_DAOVault' , balance_DAOVault.toString());

 // await tos.mint(LiquidityMiningVault, utils.parseUnits(process.env.LiquidityMiningAllocate + "." + "0".repeat(18), 18));
  let balance_LiquidityMiningVault = await tos.balanceOf(LiquidityMiningVault);
  //console.log('balance_LiquidityMiningVault' , balance_LiquidityMiningVault.toString());

 // await tos.mint(LiquidityVault, utils.parseUnits(process.env.LiquidityAllocate + "." + "0".repeat(18), 18));
  let balance_LiquidityVault = await tos.balanceOf(LiquidityVault);
  //console.log('balance_LiquidityVault' , balance_LiquidityVault.toString());

 // await tos.mint(InitialContributorVault, utils.parseUnits(process.env.InitialContributorAllocate + "." + "0".repeat(18), 18));
  let balance_InitialContributorVault = await tos.balanceOf(InitialContributorVault);
  //console.log('balance_InitialContributorVault' , balance_InitialContributorVault.toString());

////  await tos.mint(MarketingVault, utils.parseUnits(process.env.MarketingFundAllocate + "." + "0".repeat(18), 18));
  let balance_MarketingVault = await tos.balanceOf(MarketingVault);
  //console.log('balance_MarketingVault' , balance_MarketingVault.toString());

 // await tos.mint(AirdropVault, utils.parseUnits(process.env.AirdropAllocate + "." + "0".repeat(18), 18));
  let balance_AirdropVault = await tos.balanceOf(AirdropVault);
  //console.log('balance_AirdropVault' , balance_AirdropVault.toString());


  let totalSupply = await tos.totalSupply();
  //console.log('totalSupply' , totalSupply.toString());
  console.log("----------- TOS.mint  end ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
