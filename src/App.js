import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import {DatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [price, setPrice] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2018&localization=false'
  //     )
  //     .then(res => {
  //       setCoins(res.data.market_data.current_price.usd);
  //       console.log(res.data);
  //       console.log(res.data.market_data.current_price.usd)
  //       console.log(res.data.market_data.market_cap.usd)
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  
  const apiGet = (crypto, day, month, year) => {
    fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`)
    .then(res => res.json())
    .then(json => {
      console.log(json.market_data.current_price.usd)
      setPrice(json.market_data.current_price.usd)
    })
  }

  console.log(new Date())
  const onSubmit = e => {
    e.preventDefault()
    apiGet('bitcoin',selectedDate.getMonth() + 1, selectedDate.getDate(), selectedDate.getFullYear())
  };

  return (
    <div className="App">
      
      <form onSubmit={onSubmit}>
        <label>Material UI Date</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker 
            value={selectedDate} 
            onChange={handleDateChange} 
            format='MM/dd/yyy'
          />
        </MuiPickersUtilsProvider>

        <button type='submit'>Submit</button>
      </form>


                
        {price}

    </div>
  );
}

export default App;
