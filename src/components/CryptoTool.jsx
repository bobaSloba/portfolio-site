// src/components/CryptoTool.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CryptoTool = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'FUY6Y85X9QZAP1JHKYZWGYB65XSWIJG1NN'; // Replace with your actual key (use env var in prod)

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    setTransactions([]);

    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${API_KEY}`
      );

      if (response.data.status === '1') {
        setTransactions(response.data.result);
      } else {
        setError('No transactions found or invalid address.');
      }
    } catch (err) {
      setError('Error fetching data. Check the address or API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address) {
      fetchTransactions();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Blockchain Wallet Transaction Tracer</h1>
      <p>Enter an Ethereum wallet address to view recent transactions (public data via Etherscan API).</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter ETH wallet address (e.g., 0x123...)"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Loading...' : 'Trace Transactions'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {transactions.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hash</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>From</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>To</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value (ETH)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                    {tx.hash.slice(0, 10)}...
                  </a>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.from.slice(0, 10)}...</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.to.slice(0, 10)}...</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{(tx.value / 1e18).toFixed(4)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(tx.timeStamp * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoTool;