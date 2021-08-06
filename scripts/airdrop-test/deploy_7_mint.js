// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require('dotenv').config()
const save = require("../save_deployed");
const loadDeployed = require("../load_deployed");
const utils = ethers.utils;
const { printGasUsedOfUnits } = require("../log_tx");

async function main() {
  const [deployer, user1] = await ethers.getSigners();
  const users = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("----------- TOS.mint   ");
  const tostoken = loadDeployed(process.env.NETWORK, "TOS");
  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");

  // console.log("tostoken:", tostoken);
  // console.log("AirdropVault:", AirdropVault);

  const tos = await ethers.getContractAt("TOS", tostoken);

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
