import React from 'react';
import Header from './Header';
import Loading from './Loading';
import queryString from 'query-string';
import api from '../utils/api';
import utils from '../utils/Conversions';
import DaytoDay from './DaytoDay'
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;

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

class Forecast extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      load: true,
      forecastInfo: [],
      length: '5'
    };
    this.getData=this.getData.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.updateLength=this.updateLength.bind(this);
  }

  componentDidMount () {
    this.city = queryString.parse(this.props.location.search).city;
    this.getData(this.city, this.state.length);
    }

  componentWillReceiveProps(nextProps) {
    this.city = queryString.parse(nextProps.location.search).city;
    this.length = this.state.length;
    this.getData(this.city, this.length);
  }

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

  handleClick(city) {
    city.city = this.city;
    this.props.history.push({
      pathname: '/details/' + this.city,
      state: city
    })
  }

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
