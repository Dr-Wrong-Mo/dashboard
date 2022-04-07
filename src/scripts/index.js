// IMPORT JS MODULES

import manageWeather from './weather'
import manageTimeAndDate from './date'
import manageCalendar from './calendar'
import manageBookmarks from './bookmarks'

// IMPORT PRIMARY STYLESHEET
import '../styles/main.scss'

// IMPORT IMAGE FILES
import rain from '../assets/rain.jpg'
import snow from '../assets/snow.jpg'

// SOURCE MAP GENERATOR
import { SourceMapGenerator } from 'source-map-js'

// EXECUTE JS FUNCTIONS
manageCalendar()
manageTimeAndDate()
manageWeather()
manageBookmarks()

const filter = document.getElementById('filter')
filter.style.backgroundImage = `url(${rain})`
