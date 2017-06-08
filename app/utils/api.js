import axios from 'axios';

var _baseURL = 'http://api.openweathermap.org/data/2.5/';
var _APIKEY = 'b714ec74bbab5650795063cb0fdf5fbe';

function getQueryStringData (city) {
  return {
    q: city,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: 5
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

function getForcast (city) {
  var queryStringData = getQueryStringData(city);
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
