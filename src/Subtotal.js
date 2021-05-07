import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal, getDollarsTotal } from './reducer';
import { cartRedux } from './features/cartSlice';
import { useSelector } from 'react-redux';

function Subtotal() {
  const cart = useSelector(cartRedux)
  const cryptoAmount = getCartTotal(cart)
  const totalDollars = getDollarsTotal(cart)

  return (
    <div className='subtotal'>
              
        <p>Number of monthly investments: {cart.length}</p>            
        <p>Total amount of crypto acquired: {cryptoAmount}</p>
  

      <CurrencyFormat 
        renderText={(value) => (
          <>
            <p>USD total spent: {value}</p>
  
          </>
        )}
        decimalScale={2}
        value={totalDollars}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <p>Today's Value in USD: (need to make API call for today's date price) </p>
      <p>ROI: today's value in USD/total USD spent</p>
      <p>Average purchase price per crypto: ${totalDollars/cryptoAmount}</p>

    </div>
  )
}

export default Subtotal
