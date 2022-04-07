import axios from 'axios';
let temp = document.getElementById('temp')
let condition = document.getElementById('condition')
let city = document.getElementById('city')
let weatherLoader = document.getElementById('weatherLoader')

// declare global variables
let URL
let currentWeather
// placeholder coordinates in case user declines permission
let lat = 39.099724
let lng = -94.578331

// Options for GPS position request
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;
  lat = crd.latitude
  lng = crd.longitude

  // update URL variable with live lat and lng values
  URL = `https://api.weather.gov/points/${lat},${lng}`;
  

  getCity(lat, lng)
  
  fetchForecastToday()

  // Update forecast information every 15 minutes
  setInterval(() => {fetchForecastToday()}, 900000 );
}

function manageWeather() {
  navigator.geolocation.getCurrentPosition(success, error, options);
  
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function fetchForecastToday() {
  axios.get(URL).then((res) => {
    getForecast(res.data.properties.forecastHourly)
  });
}

function getForecast(forecast) {
  axios.get(forecast).then((res) => {
    currentWeather = res.data.properties.periods[0]
    weatherLoader.classList.add('hidden')
    condition.innerHTML = currentWeather.shortForecast
    temp.innerHTML = `${currentWeather.temperature}&deg; ${currentWeather.temperatureUnit}`
  })
}

function getCity (crdLat, crdLng) {
  let apiCall = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${crdLat}&longitude=${crdLng}&localityLanguage=en`  

  axios.get(apiCall).then((res) => {
    city.innerHTML = res.data.city
  });
}

export default manageWeather
