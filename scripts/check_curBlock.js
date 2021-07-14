const hre = require("hardhat");
require('dotenv').config()

async function main() {

    let provider = ethers.provider;
     let block = await provider.getBlock();

  console.log("----------- block.timestamp   ", block.timestamp );

  let unixTimestamp1 = Math.floor(new Date('2021-07-14 17:18:000').getTime()/1000);
  console.log("----------- unixTimestamp1   ", unixTimestamp1 ); // 2021-07-14 15:00:000 1626242400


1626242400
1626242400
1626244200

1626250686
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
