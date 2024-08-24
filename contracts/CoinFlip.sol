// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    // Store the address of the contract owner
    address public owner;

    // Constructor to set the owner
    constructor() {
        owner = msg.sender;
    }

    // Function to flip a coin
    function flipCoin(bool guessHeads) external payable returns (bool) {
        require(msg.value > 0, "You must send ETH to play.");

        // Simple coin flip logic based on the block timestamp
        bool result = (block.timestamp % 2 == 0);

        if (result == guessHeads) {
            // Send double the amount back to the player
            payable(msg.sender).transfer(msg.value * 2);
            return true;
        } else {
            // No tokens returned
            return false;
        }
    }
}
