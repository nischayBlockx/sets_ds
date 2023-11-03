
import { ethers,run } from "hardhat";


async function deploy() {
  const SetsFactory = await ethers.getContractFactory("Sets");
  //we passed as "maxElements=5" now for Sets
  const contract = await SetsFactory.deploy(5)
  await contract.waitForDeployment();

  const deploymentDelaySeconds = 30;
  console.log(`Waiting for ${deploymentDelaySeconds} seconds...`);
  await new Promise(resolve => setTimeout(resolve, deploymentDelaySeconds * 1000));


  const contractAddress = contract.target;
  console.log("Contract deployed to:", contractAddress);

  await run("verify:verify",{
    address: contract.target,
    constructorArguments: ["5"],
  })
}
deploy()
  .then(() => {
    console.log("Deployment successful!");
  })
  .catch((error) => {
    console.error(error);
  });


  
