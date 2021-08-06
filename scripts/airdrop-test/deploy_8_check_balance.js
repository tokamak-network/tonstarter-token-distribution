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

  console.log("----------- Check TOS Balance   ",  );
  const tostoken = loadDeployed(process.env.NETWORK, "TOS");
  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");

  console.log("tostoken:", tostoken);
  console.log("AirdropVault:", AirdropVault);

  const tos = await ethers.getContractAt("TOS", tostoken);

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
