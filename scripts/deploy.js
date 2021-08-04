// npx hardhat run --network rinkeby scripts/deploy.js
// npx hardhat verify --network rinkeby 0xD335814b0129D663c340718BddF516E0Aa072D03 "0xC30b2CDC93d72a45B63472FFB095928a5A9Ab8f0"

const hre = require("hardhat");
const dotenv = require('dotenv');
const fs = require('fs');
const envConfig = dotenv.parse(fs.readFileSync(`.env`));
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

async function main() {

  let initAcc = process.env.INITIAL_ACCOUNT;

  // We get the contract to deploy
  const XMRCH = await hre.ethers.getContractFactory("XMRCH");
  const xMRCH = await XMRCH.deploy(initAcc);

  await xMRCH.deployed();

  console.log("XMRCH deployed to:", xMRCH.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
