// src/components/WalletConnect.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Container, Typography, Paper } from '@mui/material';

const WalletConnect = ({ setSigner }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Connect Your Wallet
        </Typography>
        {walletAddress ? (
          <Typography variant="body1" align="center">
            Connected Wallet: <strong>{walletAddress}</strong>
          </Typography>
        ) : (
          <Button variant="contained" color="primary" onClick={connectWallet} fullWidth>
            Connect Wallet
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default WalletConnect;
