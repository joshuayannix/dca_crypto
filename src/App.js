import React, { useState } from 'react'
import './App.css';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [price, setPrice] = useState([])
  const [crypto, setCrypto] = useState('')

  const apiGet = (crypto, day, month, year) => {
    fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`)
    .then(res => res.json())
    .then(json => {
      console.log(json.market_data.current_price.usd)
      setPrice(json.market_data.current_price.usd)
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    apiGet(crypto, selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear())
  };

  const changeCrypto = e => {
    setCrypto(e.target.value)
  }

  return (
    <div className="App">      
      <form onSubmit={onSubmit}>                                                  
        <input 
          onChange={changeCrypto}
          value={crypto}
          placeholder="crypto"  
        />

        <label>Date</label>
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
