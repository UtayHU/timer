
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        secondsDiff = Math.floor((t / 1000) % 60),
        minutesDiff = Math.floor((t / 1000 / 60) % 60),
        hoursDiff = Math.floor((t / 1000 / 60 / 60) % 24),
        e = new Date(endtime),
        b = new Date(),
        bMonth = b.getMonth(),
        bYear = b.getFullYear(),
        eYear = e.getFullYear(),
        eMonth = e.getMonth(),
        bDay = b.getDate(),
        eDay = e.getDate() + 1,
        eDays, bDays;

    if ((eMonth == 0) || (eMonth == 2) || (eMonth == 4) || (eMonth == 6) || (eMonth == 7) || (eMonth == 9) || (eMonth == 11)) { eDays = 31; }
    if ((eMonth == 3) || (eMonth == 5) || (eMonth == 8) || (eMonth == 10)) { eDays = 30; }
    if (eMonth == 1 && ((eYear % 4 == 0) && (eYear % 100 != 0)) || (eYear % 400 == 0)) { eDays = 29; }
    if (eMonth == 1 && ((eYear % 4 != 0) || (eYear % 100 == 0))) { eDays = 28; }
    if ((bMonth == 0) || (bMonth == 2) || (bMonth == 4) || (bMonth == 6) || (bMonth == 7) || (bMonth == 9) || (bMonth == 11)) { bDays = 31; }
    if ((bMonth == 3) || (bMonth == 5) || (bMonth == 8) || (bMonth == 10)) { bDays = 30; }
    if (bMonth == 1 && ((bYear % 4 == 0) && (bYear % 100 != 0)) || (bYear % 400 == 0)) { bDays = 29; }
    if (bMonth == 1 && ((bYear % 4 != 0) || (bYear % 100 == 0))) { bDays = 28; }
    let FirstMonthDiff = bDays - bDay + 1;
    if (eDay - bDay < 0) { eMonth = eMonth - 1; eDay = eDay + eDays; }

    let daysDiff = eDay - bDay;
    if (eMonth - bMonth < 0) {
        eYear = eYear - 1;
        eMonth = eMonth + 12;
    }
    let monthDiff = eMonth - bMonth,
        yearDiff = eYear - bYear;

    if (daysDiff == eDays) {
        daysDiff = 0;
        monthDiff = monthDiff + 1;
        if (monthDiff == 12) {
            monthDiff = 0;
            yearDiff = yearDiff + 1;
        }
    }

    if ((FirstMonthDiff != bDays) && (eDay - 1 == eDays)) {
        daysDiff = FirstMonthDiff;
    }




    return {
        'total': t,
        'years': yearDiff,
        'months': monthDiff,
        'days': daysDiff,
        'hours': hoursDiff,
        'minutes': minutesDiff,
        'seconds': secondsDiff
    };

}


function setTimer(id, endtime,
    secondsSelector = '.seconds',
    minutesSelector = '.minutes',
    hoursSelector = '.hours',
    daysSelector = '.days',
    monthsSelector = '.months',
    yearsSelector = '.years') {
    let timer = document.getElementById(id);
    console.log(timer);
    let seconds = timer.querySelector(secondsSelector),
        minutes = timer.querySelector(minutesSelector),
        hours = timer.querySelector(hoursSelector),
        days = timer.querySelector(daysSelector),
        months = timer.querySelector(monthsSelector),
        years = timer.querySelector(yearsSelector),

        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        let t = getTimeRemaining(endtime);
        years.textContent = t.years;
        months.textContent = t.months;
        days.textContent = t.days;
        hours.textContent = t.hours;

        minutesValue = t.minutes.toString();
        if (minutesValue.length == 1) {
            minutesValue = '0' + t.minutes;
        }
        minutes.textContent = minutesValue;
        
        secondsValue = t.seconds.toString();
        if (secondsValue.length == 1) {
            secondsValue = '0' + t.seconds;
        }
        seconds.textContent = secondsValue;
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}