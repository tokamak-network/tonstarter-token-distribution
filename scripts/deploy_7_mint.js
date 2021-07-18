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

async function main() {
  const [deployer, user1] = await ethers.getSigners();
  const users = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

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

  let tx1 = await tos.mint(DAOVault, utils.parseUnits(process.env.DAOFundAllocate + "." + "0".repeat(18), 18));
  console.log('mint_DAOVault' , tx1.hash );
  printGasUsedOfUnits('DAOVault mint',tx1);


  let tx2 = await tos.mint(LiquidityMiningVault, utils.parseUnits(process.env.LiquidityMiningAllocate + "." + "0".repeat(18), 18));
  console.log('mint_LiquidityMiningVault' , tx2.hash);
  printGasUsedOfUnits('LiquidityMiningVault mint',tx2);

  let tx3 = await tos.mint(LiquidityVault, utils.parseUnits(process.env.LiquidityAllocate + "." + "0".repeat(18), 18));
  console.log('mint_LiquidityVault' , tx3.hash);
  printGasUsedOfUnits('LiquidityVault mint',tx3);

  let tx4 = await tos.mint(InitialContributorVault, utils.parseUnits(process.env.InitialContributorAllocate + "." + "0".repeat(18), 18));
  console.log('mint_InitialContributorVault' , tx4.hash);
  printGasUsedOfUnits('InitialContributorVault mint',tx4);

  let tx5 = await tos.mint(MarketingVault, utils.parseUnits(process.env.MarketingFundAllocate + "." + "0".repeat(18), 18));
  console.log('mint_MarketingVault' , tx5.hash);
  printGasUsedOfUnits('MarketingVault mint',tx5);

  let tx6 = await tos.mint(AirdropVault, utils.parseUnits(process.env.AirdropAllocate + "." + "0".repeat(18), 18));
  console.log('mint_AirdropVault' , tx6.hash);
  printGasUsedOfUnits('AirdropVault mint',tx6);

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
