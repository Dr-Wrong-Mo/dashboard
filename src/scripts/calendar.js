const calMonth = document.getElementById('calMonth')
const days = document.querySelectorAll('.calDay')
const rows = document.querySelectorAll('.row')
const goBack = document.getElementById('goBack')
const goForward = document.getElementById('goForward')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const today = new Date()
let monthVar = today.getMonth() + 1
let monthVarLeadingZero = monthVar >= 10 ? '' : '0'
let yearVar = today.getFullYear()

function manageCalendar () {
  displayMonth()
  fillDays()
}

function repaintCalendar () {
  monthVarLeadingZero = monthVar >= 10 ? '' : '0'
  displayMonth()
  days.forEach(day => {
    day.innerHTML = ''
    day.classList.contains('today') ? day.classList.remove('today') : ''
  });
  fillDays()
}

goBack.addEventListener('click', () => {
  monthVar--
  if (monthVar === 0) {
    monthVar = 12
    yearVar--
  }
  repaintCalendar()
})

goForward.addEventListener('click', () => {
  monthVar++
  if (monthVar === 13) {
    monthVar = 1
    yearVar++
  }
  repaintCalendar()
})

function displayMonth () {
    calMonth.innerHTML = months[monthVar - 1] + ' ' + yearVar
}

function fillDays () {
    let i = 1;

    days.forEach((el, idx) => {
        let leadingZero = 0
        leadingZero = i >= 10 ? '' : '0'
        let dayOfMonth = new Date(`${yearVar}-${monthVarLeadingZero}${monthVar}-${leadingZero}${i}T00:00:00`)

        // Add the days date if the date matches the index
        if ( dayOfMonth.getDate() === NaN ) { return }
        if ( idx < dayOfMonth.getDay() ) { return }
        if(idx - 7 > dayOfMonth.getDate()) {return}
        if ( dayOfMonth.getDate() > 20 && idx - 7 > dayOfMonth.getDate() ) { return }
        if ( idx + 1 >= dayOfMonth.getDate() ) { el.innerHTML = dayOfMonth.getDate() }
        // Add class of today if day is today's date
        if(
            dayOfMonth.getDate() === today.getDate() && 
            dayOfMonth.getMonth() === today.getMonth() && 
            dayOfMonth.getFullYear() === today.getFullYear() 
          ) {
            el.classList.add('today')
        }

        i++
    });

    rows.forEach((row, idx) => {
        let i = 0
        row.childNodes.forEach(element => {
          element.innerHTML === "" ? i++ : ""
        });

        i !== 7 ? rows[idx].classList.add('row') : ""
        i !== 7 ? rows[idx].classList.remove('hidden') : ""
        i === 7 ? rows[idx].classList.add('hidden') : ""
        i === 7 ? rows[idx].classList.remove('row') : ""
        
    });
}

export default manageCalendar;
