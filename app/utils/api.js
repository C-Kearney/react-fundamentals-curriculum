import axios from 'axios';
//calls out to the Open Weather API
var _baseURL = 'http://api.openweathermap.org/data/2.5/';
var _APIKEY = '61c9fba8c579c55b05af1644f5297a8d';
//set up the data to be included in the request
function getQueryStringData (city, days) {
  return {
    q: city,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: days
  }
}
//format the paramiters by mapping over them to append into an encoded string
function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
  .map((key) => {
    return key + '=' + encodeURIComponent(queryStringData[key]);
  }).join('&')
}
//append the routeparams onto the basic url
function prepUrl (type, queryStringData) {
  return _baseURL + type + '?' + prepRouteParams(queryStringData);
}
//create a callout url for a single day forecast
function getCurrentWeather (city) {
  var queryStringData = getQueryStringData(city);
  var url = prepUrl('weather', queryStringData)

  return axios.get(url)
    .then((currentWeatherData) => {
      return currentWeatherData.data
    })
}
//create a callout url for multiple days
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
