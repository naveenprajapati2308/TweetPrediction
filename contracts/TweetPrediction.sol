// contracts/TweetPrediction.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TweetPrediction {
    struct Pool {
        uint256 totalFunds;
        mapping(address => uint256) userFunds;
        bool resolved;
        uint256 payoutAmount;
    }

    mapping(string => Pool) public pools; // Maps tweet ID to a Pool

    function invest(string memory tweetId) public payable {
        require(msg.value > 0, "Must send funds to invest.");
        Pool storage pool = pools[tweetId];
        pool.totalFunds += msg.value;
        pool.userFunds[msg.sender] += msg.value;
    }

    function resolvePool(string memory tweetId, uint256 engagementScore) public {
        Pool storage pool = pools[tweetId];
        require(!pool.resolved, "Pool already resolved.");
        pool.payoutAmount = engagementScore * 1e15; // Example calculation
        pool.resolved = true;
    }

    function claimRewards(string memory tweetId) public {
        Pool storage pool = pools[tweetId];
        require(pool.resolved, "Pool not resolved yet.");
        uint256 reward = (pool.userFunds[msg.sender] * pool.payoutAmount) / pool.totalFunds;
        pool.userFunds[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }
}
