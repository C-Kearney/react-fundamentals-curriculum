import axios from 'axios';

var _baseURL = 'http://api.openweathermap.org/data/2.5/';
var _APIKEY = '61c9fba8c579c55b05af1644f5297a8d';

function getQueryStringData (city, days) {
  return {
    q: city,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: days
  }
}

function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
  .map((key) => {
    return key + '=' + encodeURIComponent(queryStringData[key]);
  }).join('&')
}

function prepUrl (type, queryStringData) {
  return _baseURL + type + '?' + prepRouteParams(queryStringData);
}

function getCurrentWeather (city) {
  var queryStringData = getQueryStringData(city);
  var url = prepUrl('weather', queryStringData)

  return axios.get(url)
    .then((currentWeatherData) => {
      return currentWeatherData.data
    })
}

function getForcast (city, days) {
  var queryStringData = getQueryStringData(city, days);
  var url = prepUrl('forecast/daily', queryStringData)

  return axios.get(url)
    .then((forcastData) => {
      return forcastData.data
    })
}

module.exports = {
  getCurrentWeather: getCurrentWeather,
  getForcast: getForcast
};
