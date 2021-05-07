import React from 'react'

const PriceComponent = ({crypto, dollars, day, month, year, jsonResponse}) => {
    let monthHash = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    }
    return (
        <div>
            <p>{monthHash[month]} {day}, {year}. Purchase Price: ${jsonResponse}, USD Invested: ${dollars}, Amount of {crypto} purchased: {dollars/jsonResponse}</p>      
        </div>
    )
}

export default PriceComponent