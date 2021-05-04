
function addMonths(date, months) {
    let copiedDate = new Date(date.getTime())
    var d = copiedDate.getDate();
    copiedDate.setMonth(copiedDate.getMonth() + +months);
    if (copiedDate.getDate() != d) {
        copiedDate.setDate(0);
    }
    return copiedDate;
}


const calculateMonthlyDates = (start, end) => {
    let months = end.getMonth() - start.getMonth()
    console.log(months)
    let dates = [start]

    for(let i=1; i<=months; i++) {
        let newDate = addMonths(start, i)   
        dates.push(newDate)   
    }
    return dates
  }




let test1 = new Date(2021, 1, 1)
let test2 = new Date(2021, 2, 4)
console.log(calculateMonthlyDates(test1, test2))

