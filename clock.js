const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

const CLOCK_TYPE = "24Clock",
    CLOCK_INTERVAL = "Clock_Work_Interval";

var clockInterval;

function get24Time() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:` + `${minutes < 10 ? `0${minutes}` : minutes}:` + `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getAPMTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const apm = `${hours < 13 ? "AM" : "PM"}`;

    clockTitle.innerText = `${apm} ` + `${hours > 12 ? `${hours - 12}` : hours}:` + `${minutes < 10 ? `0${minutes}` : minutes}`;
}

function changeClock(event) {
    clearInterval(clockInterval);
    showClock(event);
}

function clickClockHandler() {
    const clockType = localStorage.getItem(CLOCK_TYPE);
    if (clockType === "true") {
        changeClock("false");
        localStorage.setItem(CLOCK_TYPE, "false");
    } else {
        changeClock("true");
        localStorage.setItem(CLOCK_TYPE, "true");
    }
}

function showClock(event) {
    if (event === "false") {
        getAPMTime();
        clockInterval = setInterval(getAPMTime, 1000);
    } else {
        get24Time();
        clockInterval = setInterval(get24Time, 1000);
    }
}

function init() {
    if (localStorage.getItem(CLOCK_TYPE) === null) {
        localStorage.setItem(CLOCK_TYPE, "true");
    }
    const clockType = localStorage.getItem(CLOCK_TYPE);
    showClock(clockType);
    clockTitle.addEventListener("click", clickClockHandler);
}

init();
