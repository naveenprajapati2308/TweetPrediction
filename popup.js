import abi from './abi.json';  // This imports your abi.json

const bearerToken = "";// twitter barear key 
const contractAddress = "";//after deploying the contract with deploy.js

document.getElementById("fetch").addEventListener("click", async () => {
    const tweetId = document.getElementById("tweetId").value;
    if (!tweetId) {
        alert("Enter a valid Tweet ID.");
        return;
    }

    try {
        // Fetch tweet details using the Twitter API
        const tweetData = await fetchTweetData(tweetId);
        console.log("Fetched Tweet Data:", tweetData);

        // Interact with the Ethereum smart contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Call a contract function to process the tweet data (adjust based on contract method)
        const tx = await contract.processTweet(tweetData);
        await tx.wait();
        
        alert("Tweet processed and contract interaction successful!");
    } catch (error) {
        console.error(error);
        alert("An error occurred: " + error.message);
    }
});

// Function to fetch tweet data from Twitter API
async function fetchTweetData(tweetId) {
    const url = `https://api.twitter.com/2/tweets/${tweetId}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tweet data.");
    }

    const data = await response.json();
    return data;
}
