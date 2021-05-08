
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
    console.log(d1.getTime())
    console.log(d2.getTime())

    let diff = d2.getTime() - d1.getTime()

    let msInDay = 1000 * 3600 * 24
    console.log(diff/msInDay)

    let msInMonth = 1000 * 3600 * 24 * 30

    let months = diff/msInMonth
    console.log(months);
    /*
    calculate the number of months between the two dates
    Then from there, output the actual month dates
    */

    let result = [];
    
    for(let i=0; i<months-1; i++) {
        let newDate = addMonths(d1, i)
        result.push(newDate)
    }
    console.log(result)
}

let test1 = new Date(2020, 1, 1)
let test2 = new Date(2021, 2, 4)
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

*/