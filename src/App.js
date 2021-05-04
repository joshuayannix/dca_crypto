import React, { useState } from 'react'
import './App.css';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import 'date-fns';
import TextField from '@material-ui/core/TextField';



function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [price, setPrice] = useState([])
  const [crypto, setCrypto] = useState('')

  function addMonths(date, months) {
    let copiedDate = new Date(date.getTime())
    var d = copiedDate.getDate();
    copiedDate.setMonth(copiedDate.getMonth() + +months);
    if (copiedDate.getDate() != d) {
        copiedDate.setDate(0);
    }
    return copiedDate;
}


const calculateMonthlyDates = (start, end) => {
    let months = end.getMonth() - start.getMonth()
    let dates = [start]

    for(let i=1; i<=months; i++) {
        let newDate = addMonths(start, i)   
        dates.push(newDate)   
    }
    return dates
  }

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
    console.log('onSubmit selectedEndDate', selectedEndDate)
    console.log(calculateMonthlyDates(selectedDate,selectedEndDate))


    apiGet(crypto, selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear())

  };

  const changeCrypto = e => {
    setCrypto(e.target.value)
  }

  

  return (
    <div className="App">      
      <form onSubmit={onSubmit}>    
        
        <TextField 
          required
          variant="filled"
          id="standard-basic" 
          label="Cryptocurrency" 
          defalultValue="ethereum"
          onChange={changeCrypto}
          value={crypto}
        />

        <br/>


        <br/>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker 
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <br/>
        <br/>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker 
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <br/>
        <br/>

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
