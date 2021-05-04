import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2018&localization=false'
      )
      .then(res => {
        setCoins(res.data.market_data.current_price.usd);
        console.log(res.data);
        console.log(res.data.market_data.current_price.usd)
        console.log(res.data.market_data.market_cap.usd)
      })
      .catch(error => console.log(error));
  }, []);

  const [price, setPrice] = useState([])
  
  const apiGet = () => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2020&localization=false')
    .then(res => res.json())
    .then(json => {
      console.log(json.market_data.current_price.usd)
      setPrice(json.market_data.current_price.usd)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Historical price {coins}
        </p>
        <div>
          <button onClick={apiGet}> Press me to post some data

          </button>
        </div>
        <div>
          {price}
        </div>
      </header>
    </div>
  );
}

export default App;
