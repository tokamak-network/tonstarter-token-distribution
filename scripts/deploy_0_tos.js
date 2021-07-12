// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require('dotenv').config()
const save = require("./save_deployed");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  let tosInfo = {
    name: 'TONStarter',
    symbol: 'TOS',
    version: '1.0',
  }

  let deployInfo = {
      name : "TOS",
      address : ""
    }

  console.log("----------- deploy   ", deployInfo.name );
  //console.log("process.env.NETWORK:", process.env.NETWORK );

  const TOS = await hre.ethers.getContractFactory("TOS");
  const tos = await TOS.deploy(tosInfo.name, tosInfo.symbol, tosInfo.version);

  await tos.deployed();

  deployInfo.address = tos.address;
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
