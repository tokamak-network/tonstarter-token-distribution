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

  const DAOVault = loadDeployed(process.env.NETWORK, "DAOVault");
  const daoVault = await ethers.getContractAt("SimpleVault", DAOVault);
  let tx = await daoVault.isAdmin(process.env.NEW_ADMIN);
  console.log("DAOVault isAdmin ",process.env.NEW_ADMIN, tx);


  const LiquidityMiningVault = loadDeployed(process.env.NETWORK, "LiquidityMiningVault");
  const liquidityMiningVault = await ethers.getContractAt("SimpleVault", LiquidityMiningVault);
  tx = await liquidityMiningVault.isAdmin(process.env.NEW_ADMIN);
  console.log("LiquidityMiningVault isAdmin ",process.env.NEW_ADMIN, tx);


  const LiquidityVault = loadDeployed(process.env.NETWORK, "LiquidityVault");
  const liquidityVault = await ethers.getContractAt("DesignedVault", LiquidityVault);
  tx = await liquidityVault.isAdmin(process.env.NEW_ADMIN);
  console.log("LiquidityVault isAdmin ",process.env.NEW_ADMIN, tx);

  const MarketingVault = loadDeployed(process.env.NETWORK, "MarketingVault");
  const marketingVault = await ethers.getContractAt("DesignedVault", MarketingVault);
  tx = await marketingVault.isAdmin(process.env.NEW_ADMIN);
  console.log("MarketingVault isAdmin ",process.env.NEW_ADMIN, tx);


  const InitialContributorVault = loadDeployed(process.env.NETWORK, "InitialContributorVault");
  const initialContributorVault = await ethers.getContractAt("DesignedVault", InitialContributorVault);
  tx = await initialContributorVault.isAdmin(process.env.NEW_ADMIN);
  console.log("InitialContributorVault isAdmin ",process.env.NEW_ADMIN, tx);


  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  tx = await airdropVault.isAdmin(process.env.NEW_ADMIN);
  console.log("AirdropVault isAdmin ",process.env.NEW_ADMIN, tx);

  const TOS = loadDeployed(process.env.NETWORK, "TOS");
  const tos = await ethers.getContractAt("TOS", TOS);
  tx = await tos.isAdmin(process.env.TOS_ADMIN);
  console.log("TOS isAdmin ", process.env.TOS_ADMIN, tx);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
