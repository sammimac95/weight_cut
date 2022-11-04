let today = new Date();


let weighInDate = document.getElementById('userWeighInDate')
let startDate = document.getElementById('userSelectedStartDate')
let startWeightInput = document.getElementById('startWeight')
let targetWeightInput = document.getElementById('targetWeight')
let targetDate = ''
let dateStarted = ''
let startWeight;
let targetWeight;
let days;

weighInDate.addEventListener('change', () => {
    targetDate = document.querySelector("#userWeighInDate")
    console.log(targetDate.value)
    getDateDifference(targetDate.value, dateStarted.value)
})

startDate.addEventListener('change', () => {
    dateStarted = document.querySelector("#userSelectedStartDate")
    console.log(dateStarted.value)
    getDateDifference(targetDate.value, dateStarted.value)
})

startWeightInput.addEventListener('change', () => {
    startWeight = document.getElementById('startWeight').value
})

targetWeightInput.addEventListener('change', () => {
    targetWeight = document.getElementById('targetWeight').value
})


function getDateDifference(start, end) {
    if (targetDate != '' && dateStarted != '') {
        let date1 = new Date(start);
        let date2 = new Date(end);
        let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10) * -1;

        let displayAmountOfDays = document.querySelector('#daysAway')
        displayAmountOfDays.innerHTML = `Days away : ${diffDays}`;
        days = diffDays
        getDateRange();
    }
}

function renderTableRow(date, expectedWeight) {
    let tr = document.createElement('tr');
    let tableDate = document.createElement('td');
    let weightOnDay = document.createElement('td');
    let table = document.querySelector("#mainTable")
    tableDate.innerText = date
    weightOnDay.innerText = expectedWeight
    weightOnDay.classList.add("weightData")
    tr.appendChild(tableDate)
    tr.appendChild(weightOnDay)
    table.appendChild(tr)
}


function getDateRange() {
    for (let i = 1; i < days + 2; i++) {
        let tempDate = new Date(dateStarted.value)
        tempDate.setDate(tempDate.getDate() + i)
        let dt = tempDate
        dt = (dt.getMonth() + 1) + "/" + dt.getDate()
        renderTableRow(dt, "0")
    }
    weightLossFromCal()
    getWeekOutData()
}

function roundNearestHalf(num) {
    return Math.round(num * 2) / 2;
}


function weightLossFromCal() {
    let tds = document.querySelectorAll('.weightData')
    let startDelim = 0
    for (let weightNum of tds) {
        weightNum.innerText = roundNearestHalf(startWeight - startDelim)
        startDelim += .15
    }
}

function getWeekOutData() {
    let weekOut = document.querySelector("#weekOutWeight")
    let weekOutNum = Math.round((targetWeight * 1.0625) * 2) / 2;
    document.querySelector("#weekOutWeight").innerHTML = `Starting weight 7 days out: ${weekOutNum}`
}
