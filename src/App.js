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
import { addToCart, clearCart } from './features/cartSlice';
import { cartRedux } from './features/cartSlice';
import { useSelector } from 'react-redux';
import Subtotal from './Subtotal';

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(cartRedux);

  const [selectedDate, setDate] = useState(new Date());
  const [selectedEndDate, setEndDate] = useState(new Date());
  const [crypto, setCrypto] = useState('')
  const [dollars, setDollars] = useState('')
  const [months, setMonths] = useState([])

  const apiAxios = async (crypto, day, month, year, dollars) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${day}-${month}-${year}&localization=false`
      )

      let jsonResponse = res.data.market_data.current_price.usd
      let amountCryptoPurchased = dollars/jsonResponse

      dispatch(addToCart({
        item: { crypto, day, month, year, jsonResponse, dollars, amountCryptoPurchased }
      }));
    } catch (error) {
      console.log('error from apiAxios', error)
    }    
  }

  function addMonths(date, months) {
    let copiedDate = new Date(date.getTime())
    var d = copiedDate.getDate();
    copiedDate.setMonth(copiedDate.getMonth() + +months);
    if (copiedDate.getDate() !== d) {
        copiedDate.setDate(0);
    }
    return copiedDate;
  }

const calculateMonths = (d1, d2) => {
    let diff = d2.getTime() - d1.getTime()
    let msInMonth = 1000 * 3600 * 24 * 30

    let months = diff/msInMonth
    // console.log(months);

    let result = [d1];
    
    for(let i=1; i<months; i++) {
        let newDate = addMonths(d1, i)
        result.push(newDate)
    }
    return result
}

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(clearCart())
    let monthsArray = calculateMonths(selectedDate, selectedEndDate)
    setMonths(monthsArray);

    console.log(months, crypto, dollars, selectedDate, selectedEndDate)
   
    for(let i=0; i<months.length; i++) {
      apiAxios(crypto, months[i].getDate(), months[i].getMonth() + 1, months[i].getFullYear(), dollars)
    }
  };

  const handleCrypto = e => {
    setCrypto(e.target.value)
  }

  const handleDollars = e => {
    setDollars(e.target.value)
  }

  // const handleDateChange = e => {
  //   console.log(e)
  //   if(e.target) {
  //     setDate(e.target.value)
  //   }
  //   //setDate(e.target.value)
  // }

  // const handleEndDateChange = e => {
  //   setEndDate(e.target.value)
  // }

  return (
    <div className="App">      
      <form onSubmit={handleSubmit}>    
        
        <TextField 
          required
          variant="filled"
          id="standard-basic" 
          label="Cryptocurrency" 
          onChange={handleCrypto}
          value={crypto}
        />

        <br/>
        <br/>

        <TextField 
          required
          variant="filled"
          label="Monthly Dollar Amount" 
          onChange={handleDollars}
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
            onChange={setDate}
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
            onChange={setEndDate}
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
