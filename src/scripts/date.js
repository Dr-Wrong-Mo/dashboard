const day = document.getElementById('day');
const year = document.getElementById('year');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
let secondsRemaining

function updateCalendar (date) {
  day.innerHTML = date.constructor().slice(0, 10);
  year.innerHTML = date.constructor().slice(11, 15);

}

function updateClock () {
  const newDate = new Date();
  updateCalendar(newDate)
  secondsRemaining = 60 - (newDate.getSeconds())

  // Deal with hours
  let currentHours = newDate.getHours();
  currentHours = ('0' + currentHours).slice(-2);

  if (currentHours > 12) {
    hours.innerHTML = ('0' + (parseInt(currentHours) - 12).toString()).slice(-2);
  } else if (currentHours == 0) {
    hours.innerHTML = (currentHours + 12).slice(-2);
  } else {
    hours.innerHTML = currentHours;
  }

  // Deal with Minutes
  let currentMinutes = newDate.getMinutes();
  currentMinutes = ('0' + currentMinutes).slice(-2);
  minutes.innerHTML = currentMinutes;
}

function manageTimeAndDate() {
  updateClock()

  // Set initial timeout so that clock will reset on the minute
  // The set interval on that minute so that clock will reset every 60 seconds
  setTimeout(() => {
    updateClock()
    setInterval(() => {updateClock()}, 60000 );
  }, secondsRemaining * 1000);
}

export default manageTimeAndDate;
