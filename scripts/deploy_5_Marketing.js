// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require('dotenv').config()
const save = require("./save_deployed");
const loadDeployed = require("./load_deployed");

async function main() {

  let inputInfo = {
    name: 'Marketing',
    maxInputOnce: process.env.maxInputOnce
  }

  let deployInfo = {
      name : "MarketingVault",
      address : ""
    }
  console.log("----------- deploy   ", deployInfo.name );
  const tostoken = loadDeployed(process.env.NETWORK, "TOS");
  console.log("tostoken:", tostoken);

  const MarketingVault = await hre.ethers.getContractFactory("MarketingVault");
  const vault = await MarketingVault.deploy(tostoken, inputInfo.maxInputOnce);

  await vault.deployed();
  deployInfo.address = vault.address;

  console.log("deployed to:", deployInfo);

  if(deployInfo.address != null && deployInfo.address.length > 0  ){
    save(process.env.NETWORK, deployInfo);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
