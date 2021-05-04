import React, { useState } from 'react'
import './App.css';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';


function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
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
    console.log('onSubmit selectedDate', selectedDate)
    apiGet(crypto, selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear())
  };

  const changeCrypto = e => {
    setCrypto(e.target.value)
  }

  const calculateMonths = (start, end) => {
    let months = start.getMonth() - end.getMonth()
    let dates = [start]
    while(months > 0) {
      dates.push(start + 1)
      months--
    }
    return dates
  }

  return (
    <div className="App">      
      <form onSubmit={onSubmit}>    
        <label>Cryptocurrency</label>      
        <input 
          onChange={changeCrypto}
          value={crypto}
          placeholder="crypto"  
        />
        <br/>
        <br/>
        
        <input 
          type="date" 
          id="start" 
          class="form-control" 
          name="trip-start" value="2016-07-22" min="2000-1-1"/>
        
        <label>Start Date</label>        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker 
            value={selectedDate} 
            onChange={handleDateChange} 
            format='MM/dd/yyy'
          />
        </MuiPickersUtilsProvider>
        <br/>
        <br/>
        <label>End Date</label>        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker 
            value={selectedDate} 
            onChange={handleDateChange} 
            format='MM/dd/yyy'
          />
        </MuiPickersUtilsProvider>

        <label>Frequency
          <select>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Daily</option>
          </select>
        </label>
        <br/>
        <br/>

        <Button
          type='submit'
          color='secondary'
        >submit</Button>
      </form>

      <div>
        RESULTS
        <div>{price}</div>
        
        
      </div>
                
        

    </div>
  );
}

export default App;
