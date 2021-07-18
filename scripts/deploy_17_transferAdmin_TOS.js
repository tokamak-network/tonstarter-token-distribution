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
  const [deployer] = await ethers.getSigners();

  const TOS = loadDeployed(process.env.NETWORK, "TOS");
  const tos = await ethers.getContractAt("TOS", TOS);

  let tx = await tos.removeMinter(deployer.address);
  console.log("TOS removeMinter ", deployer.address, tx.hash);
  printGasUsedOfUnits('TOS removeMinter',tx);

  tx = await tos.removeBurner(deployer.address);
  console.log("TOS removeBurner ", deployer.address,  tx.hash);
  printGasUsedOfUnits('TOS removeBurner ',tx);

  tx = await tos.transferAdmin(process.env.TOS_ADMIN);
  console.log("TOS transferAdmin ", tx.hash);
  printGasUsedOfUnits('TOS transferAdmin',tx);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
