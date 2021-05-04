import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());

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
  const [date, setDate] = useState([]);

  const onSubmit = e => {
    e.preventDefault()
    apiGet()
  };

  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker 
          value={selectedDate} 
          onChange={handleDateChange} 
          format='MM/dd/yyy'
        />
      </MuiPickersUtilsProvider>
      <form onSubmit={onSubmit}>
        
        <label> Date</label>
        <input
          value={date}
          onChange = {e=>setDate(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>


        <p> Historical price {coins}</p>
        <button onClick={apiGet}> Press me to post some data
        </button>
        {price}

    </div>
  );
}

export default App;
