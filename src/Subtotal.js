import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal, getDollarsTotal } from './reducer';
import { cartRedux } from './features/cartSlice';
import { useSelector } from 'react-redux';

function Subtotal() {
  const cart = useSelector(cartRedux)
  
  return (
    <div className='subtotal'>

      <CurrencyFormat 
        renderText={(value) => (
          <>
            <p>Number of monthly investments: {cart.length}</p>
            <p>Total amount of crypto acquired: {value}</p>
  
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
      />
      <CurrencyFormat 
        renderText={(value) => (
          <>
            <p>Total dollars invested: {value}</p>
  
          </>
        )}
        decimalScale={2}
        value={getDollarsTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <p>ROI</p>
      <p>Average purchase price per crypto: </p>

    </div>
  )
}

export default Subtotal
