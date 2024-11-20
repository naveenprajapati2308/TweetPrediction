const hre = require("hardhat");

async function main() {
  // Compile the contract (if not already compiled)
  await hre.run("compile");

  // Get the contract factory
  const TweetPrediction = await hre.ethers.getContractFactory("TweetPrediction");

  // Deploy the contract
  const tweetPrediction = await TweetPrediction.deploy();

  // Wait for the deployment to complete
  await tweetPrediction.deployed();

  // Log the deployed contract address
  console.log("TweetPrediction deployed to:", tweetPrediction.address);
}

// Handle async errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
