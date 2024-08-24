// src/App.js
import React, { useState } from 'react';
import CoinFlip from './components/CoinFlip';
import WalletConnect from './components/WalletConnect';
import './App.css'; // Ensure the CSS file is imported

const App = () => {
  const [signer, setSigner] = useState(null);

  return (
    <div className="App">
      <div className="wallet-section">
        <WalletConnect setSigner={setSigner} />
      </div>
      <div className="game-section">
        {signer ? (
          <CoinFlip signer={signer} />
        ) : (
          <p className="info-text">Please connect your wallet to start playing the game.</p>
        )}
      </div>
    </div>
  );
};

export default App;
