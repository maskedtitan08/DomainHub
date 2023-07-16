// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.parseEther(n.toString(), 'ether')
}


async function main() {

  const [deployer] = await ethers.getSigners();
  const name = "DomainHub";
  const symbol = "DHB";

  const domainHub = await hre.ethers.deployContract("DomainHub",[name,symbol]);

  await domainHub.waitForDeployment();

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );

  console.log("Contract deployed to ", domainHub.target);
  const names = ["Stellar.dhb.eth", "lunalink.dhb.eth", "echoCove.dhb", "luminary.dhb", "solisWeb.dhb", "vidaTech.dhb"]
  const costs = [tokens(9), tokens(17), tokens(15), tokens(2.5), tokens(3), tokens(1)]

  for (var i = 0; i < 6; i++) {
    const transaction = await domainHub.connect(deployer).listDomain(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
