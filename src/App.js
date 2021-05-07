import React, { useEffect, useState } from 'react'
import './App.css';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import PriceComponent from './PriceComponent';
import { useDispatch } from 'react-redux';
import { addToCart } from './features/cartSlice';
import { cartRedux } from './features/cartSlice';
import { useSelector } from 'react-redux';
import Subtotal from './Subtotal';


function App() {
  const dispatch = useDispatch();
  const cart = useSelector(cartRedux);

  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [crypto, setCrypto] = useState('')
  const [dollars, setDollars] = useState('')
  const [months, setMonths] = useState([])
  const [apiPrices, setApiPrices] = useState([])

  useEffect(() => {
    
  })
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

  // old apiAxios before redux
  // const apiAxios = (crypto, day, month, year, dollars) => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`
  //     )
  //     .then(res => {
  //       console.log(res.data)
  //       let jsonResponse = res.data.market_data.current_price.usd
  //       setApiPrices(arr => [...arr, {crypto, day, month, year, jsonResponse, dollars}])
  //     })
  //     .catch(error => console.log('Error from apiAxios:', error));
  // }

  //non async
  // const apiAxios = (crypto, day, month, year, dollars) => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`
  //     )
  //     .then(res => {
  //       console.log(res.data)
  //       let jsonResponse = res.data.market_data.current_price.usd
  //       let amountCryptoPurchased = dollars/jsonResponse
  //       dispatch(addToCart({
  //         item: { crypto, day, month, year, jsonResponse, dollars, amountCryptoPurchased }
  //       }))
  //     })
  //     .catch(error => console.log('Error from apiAxios:', error));
  // }

  const apiAxios = async (crypto, day, month, year, dollars) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`
      )
      console.log('api call completed for: ', crypto, day, month, year, dollars);      

      let jsonResponse = res.data.market_data.current_price.usd
      let amountCryptoPurchased = dollars/jsonResponse

      dispatch(addToCart({
        item: { crypto, day, month, year, jsonResponse, dollars, amountCryptoPurchased }
      }));
    } catch (error) {
      console.log('error from apiAxios', error)
    }    
  }

  
  const onSubmit = e => {
    e.preventDefault()

    // Calculate all the month times between the dates, and update the months array
    let monthTimes = calculateMonthlyDates(selectedDate,selectedEndDate)
    setMonths(monthTimes)
    console.log('submitted')
    // For each month time in the months array, we need to call the API to get a price
    // Add these prices to the apiPrices array

    /* This for loop is getting skipped, not because of anything with apiAxios
    But because months.length is 0!
    */
   console.log(months, months.length)
    for(let i=0; i<months.length; i++) {
      console.log('looping')
      apiAxios(crypto, months[i].getDate(), months[i].getMonth() + 1, months[i].getFullYear(), dollars)
    }

    console.log('after the loop')

  };

  const changeCrypto = e => {
    setCrypto(e.target.value)
  }

  const changeDollars = e => {
    setDollars(e.target.value)
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

        <TextField 
          required
          variant="filled"
          label="Monthly Dollar Amount" 
          onChange={changeDollars}
          value={dollars}
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
        <h2>Monthly Investments</h2>               
        {cart.map(api => {
          return (
            <PriceComponent
              crypto={api.crypto}
              dollars={api.dollars}
              day={api.day}
              month={api.month}
              year={api.year}
              jsonResponse={api.jsonResponse}
            />
          )
        })}
        
      </div>
      <h2> Summary of Investments</h2>
      <div>
        <Subtotal />
      </div>        
        

    </div>
  );
}

export default App;
