
function addMonths(date, months) {
    let copiedDate = new Date(date.getTime())
    var d = copiedDate.getDate();
    copiedDate.setMonth(copiedDate.getMonth() + +months);
    if (copiedDate.getDate() != d) {
        copiedDate.setDate(0);
    }
    return copiedDate;
}

// how can I change addMonths so that it doesn't mutate my input

const calculateMonthlyDates = (start, end) => {
    let months = end.getMonth() - start.getMonth()
    console.log(months)
    let dates = [start]

    for(let i=1; i<months; i++) {
        let newDate = addMonths(start, i)   
        dates.push(newDate)   
    }
    return dates
  }




let test1 = new Date(2021, 1, 23)
let test2 = new Date(2021, 4, 1)
console.log(calculateMonthlyDates(test1, test2))

