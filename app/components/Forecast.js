import React from 'react';
import Header from './Header';
import Loading from './Loading';
import queryString from 'query-string';
import api from '../utils/api';
import utils from '../utils/Conversions';
import DaytoDay from './DaytoDay'
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;
/*Forecast Length creates an array of lits items that can be clicked on to change
the number of days forecasted. the user can chose from 5, 7, and 10 days. The
Array can be changed to allow different ammount of days as wanted.*/
function ForecastLength(props) {
  var days = ['5', '7', '10'];
  return(
    <ul className='length'>
      {days.map((day) => {
        return (
          <li
            style={day === props.chosenDay ? { color: 'green'}: {color: 'orangered'}}
            onClick={props.onSelect.bind(null, day)}
            key={day}>
            {day} Days
          </li>
        )
      })}
    </ul>
  )
}

/*forecast renders a view of multiple DaytoDay images based on the response
recieved from the Open Weather API. load state tells the DOM if the loading
screen is shown or not. forecastInfo holds the array of objects pulled in the
API request. length tells the API request how many days to fetch.*/
class Forecast extends React.Component {

  //provide the initial state of the object
  constructor(props) {
    super(props);

    this.state = {
      load: true,
      forecastInfo: [],
      length: '5'
    };
    //bind funcitons found in this component to the specific instance of the component
    this.getData=this.getData.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.updateLength=this.updateLength.bind(this);
  }
  //setup the API request when the component renders to the DOM
  componentDidMount () {
    this.city = queryString.parse(this.props.location.search).city;
    this.getData(this.city, this.state.length);
    }
  //when the component is submitted new props send out a new API request with the updated info
  componentWillReceiveProps(nextProps) {
    this.city = queryString.parse(nextProps.location.search).city;
    this.length = this.state.length;
    this.getData(this.city, this.length);
  }
  //used to handle when the user changes the length of the forecast requested.
  //updates the state of length and sends out a new request with the updated length.
  updateLength(days) {
    this.setState(() => {
      return {
        length: days
      }
    })
    this.city = queryString.parse(this.props.location.search).city;

    api.getForcast(this.city, days)
      .then((res) => {
        this.setState(() => {
          return {
            load: false,
            forecastInfo: res
          }
        });
      });
  }
  /*calls the getForecast API funtion sets forecastInfo to the array of objects
  obtained from the request.*/
  getData (city, length) {
    this.setState(() => {
      return{
        load: true
      }
    });

    api.getForcast(city, length)
      .then((res) => {
        this.setState(() => {
          return {
            load: false,
            forecastInfo: res
          }
        });
      });
  }
  /*used to make the DaytoDay components rendered clickable.
  sends the user to the path specified and passes the city name to the detials funciton*/
  handleClick(city) {
    city.city = this.city;
    this.props.history.push({
      pathname: '/details/' + this.city,
      state: city
    })
  }
  /*render a header component with title forecast. Check the value of the loading
  state. If it is true render the loadign component. If it is false render the
  forecast length bar and a group of the DaytoDay components. Each DaytoDay
  component gets the onClick function to create an object that will create a path
  to the details page.*/
  render() {
    var city = queryString.parse(this.props.location.search).city;
    return(
      <div>
        <Header title='Forecast' />
        {this.state.load === true
          ? <Loading text='Checking' />
          : <div>
              <ForecastLength chosenDay={this.state.length} onSelect={this.updateLength} />
              <h1 className='forecast-header'>{city}</h1>
              <div className='forecast-container'>
                {this.state.forecastInfo.list.map((listItem) => {
                  return <DaytoDay onClick={this.handleClick.bind(this, listItem)} key={listItem.dt} day={listItem} />
                })}
              </div>
            </div>
        }
      </div>
    )
  }
}

module.exports = Forecast;
