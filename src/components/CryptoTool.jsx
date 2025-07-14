// src/components/CryptoTool.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import for consistency (optional: remove if you don't want navbar here)
import './CryptoTool.css';

const CryptoTool = () => {
  const [chain, setChain] = useState('ETH'); // Default to ETH
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY; // Secure from .env

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    setTransactions([]);

    try {
      let response;
      if (chain === 'ETH') {
        response = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`
        );
        if (response.data.status === '1') {
          setTransactions(response.data.result.map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: (tx.value / 1e18).toFixed(4),
            timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
            direction: tx.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received',
          })));
        } else {
          setError('No transactions found or invalid address.');
        }
      } else if (chain === 'BTC') {
        response = await axios.get(
          `https://api.blockcypher.com/v1/btc/main/addrs/${address}?limit=10`
        );
        const txrefs = response.data.txrefs || response.data.unconfirmed_txrefs || [];
        setTransactions(txrefs.map(txref => ({
          hash: txref.tx_hash,
          from: txref.spent_by ? 'Multiple (spent)' : 'Multiple',
          to: txref.tx_output_n >= 0 ? 'Multiple' : 'Multiple',
          value: (Math.abs(txref.value) / 1e8).toFixed(4), // Absolute for display
          timestamp: txref.confirmed ? new Date(txref.confirmed).toLocaleString() : 'Unconfirmed',
          direction: txref.tx_output_n === -1 ? 'Sent' : 'Received', // Better direction inference
        })));
        if (txrefs.length === 0) {
          setError('No transactions found or invalid address.');
        }
      }
    } catch (err) {
      setError('Error fetching data. Check address, chain, or API limits.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address && chain) {
      fetchTransactions();
    }
  };

  return (
    <div className="crypto-tool-container">
      {/* <Navbar /> */} {/* Keep this commented out or remove it entirely if the navbar doesn't fit well— we can style a custom one later */}
      <h1>Blockchain KYT Tracer</h1>
      <p>Select chain, enter address, trace txs (public data). Fight crime: Track funds, flag risks.</p>
      
      <form onSubmit={handleSubmit} className="crypto-form">
        <select value={chain} onChange={(e) => setChain(e.target.value)} className="crypto-select">
          <option value="ETH">Ethereum (ETH)</option>
          <option value="BTC">Bitcoin (BTC)</option>
        </select>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={`Enter ${chain} address (e.g., ${chain === 'ETH' ? '0x123...' : '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'})`}
          className="crypto-input"
        />
        <button type="submit" disabled={loading} className="crypto-button">
          {loading ? 'Tracing...' : 'Trace'}
        </button>
      </form>
  
      {error && <p className="crypto-error">{error}</p>}
  
      {transactions.length > 0 && (
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Hash</th>
              <th>Direction</th>
              <th>From</th>
              <th>To</th>
              <th>Value ({chain})</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={chain === 'ETH' ? `https://etherscan.io/tx/${tx.hash}` : `https://live.blockcypher.com/btc/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tx.hash.slice(0, 10)}...
                  </a>
                </td>
                <td>{tx.direction}</td>
                <td>{tx.from.slice(0, 10)}...</td>
                <td>{tx.to.slice(0, 10)}...</td>
                <td>{tx.value}</td>
                <td>{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="crypto-disclaimer">Disclaimer: Lawful use only. Public APIs—respect limits.</p>
    </div>
  );
};

export default CryptoTool;