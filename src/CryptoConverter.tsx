import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Currency = 'USDT' | 'BTC' | 'ETH';

interface Rates {
  [key: string]: number;
}

const CryptoConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>('USDT');
  const [toCurrency, setToCurrency] = useState<Currency>('BTC');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [rates, setRates] = useState<Rates>({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
        const prices: Rates = {};
        response.data.forEach((pair: { symbol: string; price: string }) => {
          if (pair.symbol === 'BTCUSDT') prices['BTC'] = parseFloat(pair.price);
          if (pair.symbol === 'ETHUSDT') prices['ETH'] = parseFloat(pair.price);
          if (pair.symbol === 'BTCETH') prices['BTC/ETH'] = parseFloat(pair.price);
        });
        setRates(prices);
      } catch (error) {
        console.error("Error fetching rates: ", error);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else if (fromCurrency === 'USDT') {
      setConvertedAmount(amount / rates[toCurrency]);
    } else if (toCurrency === 'USDT') {
      setConvertedAmount(amount * rates[fromCurrency]);
    } else {
      const intermediate = amount * rates[fromCurrency];
      setConvertedAmount(intermediate / rates[toCurrency]);
    }
  }, [fromCurrency, toCurrency, amount, rates]);

  return (
    <div className="crypto-converter">
      <div>
        <label>From:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value as Currency)}>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>To:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value as Currency)}>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
        <input
          type="number"
          value={convertedAmount}
          readOnly
        />
      </div>
    </div>
  );
};

export default CryptoConverter;
