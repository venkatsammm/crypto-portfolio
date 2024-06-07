import React, { useState, useEffect } from 'react';

const App = () => {
  const [assets, setAssets] = useState([]);
  const [address, setAddress] = useState('0x209c8bbE2454257Eb1A8E630f59f4b1b50a98543'); // State to store the input address

  const fetchAssets = async (address) => {
    if (process.env.REACT_APP_MORALIS_API_KEY) {
      try {
        // Replace this URL with the actual API endpoint
        const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY
          },
        });
        const data = await response.json();
        console.log(data.result)
        setAssets(data.result);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    }
    else {
      console.error("No Moralis API key in .env")
    }
  };

  // Function to handle the input change
  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    fetchAssets(address);
  };

  useEffect(() => {
    fetchAssets(address);
  }, [address]);

  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    color: '#007bff'
  };

  const headerStyle = {
    marginBottom: '20px',
    fontSize: '2em',
    color: '#007bff'
  };

  const inputContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '1em',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #007bff',
    color: '#007bff'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    color: '#007bff'
  };

  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    color: '#007bff'
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px'
  };

  const assetLogoStyle = {
    width: '30px',
    height: '30px'
  };

  const negativeStyle = {
    color: 'red'
  };

  const positiveStyle = {
    color: 'green'
  };

  const responsiveStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <div style={appStyle}>
      <h1 style={headerStyle}>My Crypto Portfolio</h1>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter Wallet Address"
          style={inputStyle}
        />
        <button onClick={handleButtonClick} style={buttonStyle}>Fetch Assets</button>
      </div>
      <div style={responsiveStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Logo</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Value</th>
              <th style={thStyle}>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.token_address}>
                <td style={tdStyle}><img src={asset.thumbnail} alt={asset.name} style={assetLogoStyle} /></td>
                <td style={tdStyle}>{asset.name}</td>
                <td style={tdStyle}>${parseFloat(asset.usd_price?.toFixed(2))}</td>
                <td style={tdStyle}>${parseFloat(asset.usd_value?.toFixed(2))}</td>
                <td style={{ ...tdStyle, ...(asset.usd_price_24hr_percent_change < 0 ? negativeStyle : positiveStyle) }}>
                  {parseFloat(asset.usd_price_24hr_percent_change?.toFixed(2))}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '20px', color: '#007bff' }}>
        <p>Please make sure you <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>MetaMask Wallet Link</a></p>
      </div>
    </div>
  );
};

export default App;
