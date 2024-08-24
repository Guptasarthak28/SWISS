// src/components/CoinFlip.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Container, Typography, Paper, TextField, Select, MenuItem } from '@mui/material';

const CoinFlip = ({ signer }) => {
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState('heads');
  const [transactionLink, setTransactionLink] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const handleCoinFlip = async () => {
    try {
      // Example logic for a coin flip and transaction
      const random = Math.random() < 0.5 ? 'heads' : 'tails';
  
      // Simulate transaction (replace with actual smart contract interaction)
      const transactionResponse = await signer.sendTransaction({
        to: '0x7102F0785BC97319103485923002a2d48a64cD35', // Replace with your contract address
        value: ethers.parseEther(amount)
      });
  
      // Wait for the transaction to be mined
      const transactionReceipt = await transactionResponse.wait();
  
      // Transaction hash
      const txHash = transactionReceipt.transactionHash;
  
      // Display result and set transaction link
      if (random === side) {
        setResultMessage(`Congratulations! You won ${amount} ETH!`);
      } else {
        setResultMessage('Sorry, you lost.');
      }
  
      // Generate Etherscan link
      const etherscanLink = `https://etherscan.io/tx/${txHash}`;
      setTransactionLink(etherscanLink);
    } catch (err) {
      console.error('Error flipping the coin:', err);
      setResultMessage('An error occurred during the transaction.');
  
      if (err.code === 'INSUFFICIENT_FUNDS') {
        setResultMessage('Insufficient funds for transaction.');
      } else if (err.code === 'NETWORK_ERROR') {
        setResultMessage('Network error. Please try again later.');
      } else if (err.code === 'UNPREDICTABLE_GAS_LIMIT') {
        setResultMessage('Gas limit estimation failed. Try adjusting gas settings.');
      } else {
        setResultMessage(`Error: ${err.message}`);
      }
    }
  };
  
  

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Coin Flip Game
        </Typography>
        <TextField
          label="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="heads">Heads</MenuItem>
          <MenuItem value="tails">Tails</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCoinFlip}
          fullWidth
        >
          Flip Coin
        </Button>
        {resultMessage && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            {resultMessage}
          </Typography>
        )}
        {transactionLink && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            <a href={transactionLink} target="_blank" rel="noopener noreferrer">
              View Transaction on Etherscan
            </a>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CoinFlip;
