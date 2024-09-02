import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '3fb85f6f8cd155c00ea57400';

  const fetchConversionRate = useCallback(async () => {
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${sourceCurrency}`;
    console.log('Fetching data from:', API_URL);
    try {
      const response = await axios.get(API_URL);
      console.log('API response:', response.data);
  
      if (response.status === 200) {
        const rates = response.data.rates || {};
        console.log('Rates data:', rates);
        const rate = rates[targetCurrency];
        console.log('Rate found:', rate);
        if (rate) {
          setConvertedAmount((amount * rate).toFixed(2));
          setError(null);
        } else {
          throw new Error(`Conversion rate not found for target currency: ${targetCurrency}`);
        }
      } else {
        throw new Error(`API responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('API error:', error.response ? error.response.data : error.message);
      setError(`Error fetching conversion rate: ${error.response ? error.response.data : error.message}`);
      setConvertedAmount(null);
    }
  }, [amount, sourceCurrency, targetCurrency]);

  useEffect(() => {
    if (amount && !isNaN(amount) && sourceCurrency && targetCurrency) {
      fetchConversionRate();
    }
  }, [amount, sourceCurrency, targetCurrency, fetchConversionRate]);

  return (
    <div className="converter">
      <h1>Currency Converter</h1>
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          {/* Add more currencies as needed */}
        </select>
        <span>to</span>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          {/* Add more currencies as needed */}
        </select>
      </div>
      <div className="result">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p>
            {amount} {sourceCurrency} = {convertedAmount} {targetCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
