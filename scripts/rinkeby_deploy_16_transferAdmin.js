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

  const AirdropVault = loadDeployed(process.env.NETWORK, "AirdropVault");
  const airdropVault = await ethers.getContractAt("WhitelistVault", AirdropVault);
  tx = await airdropVault.transferAdmin(process.env.NEW_ADMIN);
  console.log("AirdropVault transferAdmin ", tx.hash);
  printGasUsedOfUnits('AirdropVault transferAdmin',tx);

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
