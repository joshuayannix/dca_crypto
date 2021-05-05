import React, { useState } from 'react'
import './App.css';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import PriceComponent from './PriceComponent';


function App() {
  

  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [crypto, setCrypto] = useState('')
  const [months, setMonths] = useState([])
  const [apiPrices, setApiPrices] = useState([])

  // Add Months method
  function addMonths(date, months) {
    let copiedDate = new Date(date.getTime())
    var d = copiedDate.getDate();
    copiedDate.setMonth(copiedDate.getMonth() + +months);
    if (copiedDate.getDate() != d) {
        copiedDate.setDate(0);
    }
    return copiedDate;
  }

  // Calculate number of months in between start and end dates
  const calculateMonthlyDates = (start, end) => {
    let months = end.getMonth() - start.getMonth()
    let dates = [start]

    for(let i=1; i<=months; i++) {
        let newDate = addMonths(start, i)   
        dates.push(newDate)   
    }
    return dates
  }

  // const apiFetch = (crypto, day, month, year) => {
  //   fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`)
  //   .then(res => res.json())
  //   .then(json => {
  //     let jsonResponse = json.market_data.current_price.usd
  //     // update the array of prices
  //     setApiPrices(arr => [...arr, jsonResponse])
  //   })
  // }

  const apiAxios = (crypto, day, month, year) => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`
      )
      .then(res => {
        console.log(res.data)
        let jsonResponse = res.data.market_data.current_price.usd
        setApiPrices(arr => [...arr, {day, month, year, jsonResponse}])
      })
      .catch(error => console.log('Error from apiAxios:', error));
  }

  
  const onSubmit = e => {
    e.preventDefault()

    // Calculate all the month times between the dates, and update the months array
    let monthTimes = calculateMonthlyDates(selectedDate,selectedEndDate)
    setMonths(monthTimes)

    // For each month time in the months array, we need to call the API to get a price
    // Add these prices to the apiPrices array

    for(let i=0; i<months.length; i++) {
      console.log('looping')
      apiAxios(crypto, months[i].getDate(), months[i].getMonth() + 1, months[i].getFullYear())
    }
    //apiFetch(crypto, selectedDate.getDate(), selectedDate.getMonth() + 1, selectedDate.getFullYear())
    console.log('apiPrices:', apiPrices)
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
            label="Start Date"
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
            id="end-date-picker-dialog"
            label="End date"
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


        <Button
          type='submit'
          color='secondary'
        >submit
        </Button>
      </form>

      <div>
        RESULTS
        <br/>
        Cryptocurrency: {crypto}
        <div>API Prices:</div>        
        {apiPrices.map(api => {
          return (
            <PriceComponent
              day={api.day}
              month={api.month}
              year={api.year}
              jsonResponse={api.jsonResponse}
            />
          )
        })}
        
      </div>
                
        

    </div>
  );
}

export default App;
