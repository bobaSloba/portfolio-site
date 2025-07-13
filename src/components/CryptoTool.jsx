// src/components/CryptoTool.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import for consistency (optional: remove if you don't want navbar here)

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
    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: '#1e1e1e',
      color: '#00ff00',
      fontFamily: 'monospace',
      border: '1px solid #00ff00',
      borderRadius: '5px',
      minHeight: '100vh', // Full page feel
    }}>
      <Navbar /> {/* Optional: Adds your site's navbar for navigation back to home */}
      <h1 style={{ color: '#00ff00', textAlign: 'center' }}>Blockchain KYT Tracer</h1>
      <p style={{ textAlign: 'center' }}>Select chain, enter address, trace txs (public data). Fight crime: Track funds, flag risks.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          style={{
            padding: '10px',
            backgroundColor: '#000',
            color: '#00ff00',
            border: '1px solid #00ff00',
            marginRight: '10px',
          }}
        >
          <option value="ETH">Ethereum (ETH)</option>
          <option value="BTC">Bitcoin (BTC)</option>
        </select>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={`Enter ${chain} address (e.g., ${chain === 'ETH' ? '0x123...' : '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'})`}
          style={{
            width: '50%',
            padding: '10px',
            backgroundColor: '#000',
            color: '#00ff00',
            border: '1px solid #00ff00',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#00ff00',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
          {loading ? 'Tracing...' : 'Trace'}
        </button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {transactions.length > 0 && (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          color: '#00ff00',
          marginTop: '20px',
        }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #00ff00', padding: '8px' }}>Hash</th>
              <th style={{ border: '1px solid #00ff00', padding: '8px' }}>Direction</th>
              <th style={{ border: '1px solid #00ff00', padding: '8px' }}>From</th>
              <th style={{ border: '1px solid #00ff00', padding: '8px' }}>To</th>
              <th style={{ border: '1px solid #00ff00', padding: '8px' }}>Value ({chain})</th>
              <th style={{ border: '1px solid #00ff00', padding: '8px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #00ff00', padding: '8px' }}>
                  <a
                    href={chain === 'ETH' ? `https://etherscan.io/tx/${tx.hash}` : `https://live.blockcypher.com/btc/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#00ff00' }}
                  >
                    {tx.hash.slice(0, 10)}...
                  </a>
                </td>
                <td style={{ border: '1px solid #00ff00', padding: '8px' }}>{tx.direction}</td>
                <td style={{ border: '1px solid #00ff00', padding: '8px' }}>{tx.from.slice(0, 10)}...</td>
                <td style={{ border: '1px solid #00ff00', padding: '8px' }}>{tx.to.slice(0, 10)}...</td>
                <td style={{ border: '1px solid #00ff00', padding: '8px' }}>{tx.value}</td>
                <td style={{ border: '1px solid #00ff00', padding: '8px' }}>{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>Disclaimer: Lawful use only. Public APIs—respect limits.</p>
    </div>
  );
};

export default CryptoTool;