import React from 'react'

const PriceComponent = ({crypto, dollars, day, month, year, jsonResponse}) => {
    return (
        <div>
            <p>Day: {day}, Month:{month}, Year:{year}, Price:{jsonResponse}, Monthly Amount:${dollars}, Amount of {crypto} purchased: {dollars/jsonResponse}</p>
      
        </div>
    )
}

export default PriceComponent