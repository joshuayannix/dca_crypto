
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
    
    for(let i=1; i<months-1; i++) {
        let newDate = addMonths(d1, i)
        result.push(newDate)
    }
    return result
}

let test1 = new Date(2020, 1, 1)
let test2 = new Date(2020, 1, 4)
console.log(calculateMonths(test1, test2))

/*
  // Add Months method
  function addMonths(date, months) {
    let copiedDate = new Date(date.getTime())
    var d = copiedDate.getDate();
    copiedDate.setMonth(copiedDate.getMonth() + +months);
    if (copiedDate.getDate() !== d) {
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



  <div>
          <h6>Start Date </h6>
          <input 
            type="date" 
            id="start" 
            class="form-control" 
            name="trip-start" 
            value="2016-07-22" 
            min="2000-1-1"
            onChange={setDate}
          >
            </input>
        </div>
*/