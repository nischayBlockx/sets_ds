
import { ethers,run } from "hardhat";


async function deploy() {
  const SetsFactory = await ethers.getContractFactory("Sets");
  //we passed as "maxElements=5" now for Sets
  const contract = await SetsFactory.deploy(5)
  await contract.waitForDeployment();


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


  
