// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require('dotenv').config()

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let RINKEBY=true;
  let LOCAL=false;

  //let _name = "InitialContributor";
  let _maxInputOnce = 20;

    if(RINKEBY){
        const InitialContributorVault = await hre.ethers.getContractFactory("InitialContributorVault");
        const vault = await InitialContributorVault.deploy(process.env.RINKEBY_TOS_ADDRESS, _maxInputOnce);

        await vault.deployed();

        console.log("InitialContributor Vault deployed to:", vault.address);
    }
     if(LOCAL){
        const TOS = await hre.ethers.getContractFactory("TOS");
        const tos = await TOS.deploy("TOS","TOS",1);
        await tos.deployed();
        console.log("tos deployed to:", tos.address);

        const InitialContributorVault = await hre.ethers.getContractFactory("InitialContributorVault");
        const vault = await InitialContributorVault.deploy(tos.address, _maxInputOnce);
        await vault.deployed();
        console.log("InitialContributor Vault deployed to:", vault.address);
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