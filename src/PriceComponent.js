import React from 'react'

const PriceComponent = ({day, month, year, jsonResponse}) => {
    return (
        <div>
            <p>Day: {day}, Month:{month}, Year:{year}, Price:{jsonResponse}</p>
      
        </div>
    )
}

export default PriceComponent