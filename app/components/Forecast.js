import React from 'react';
import Header from './Header';
import Loading from './Loading';
import queryString from 'query-string';
import api from '../utils/api';
import utils from '../utils/Conversions';
import DaytoDay from './DaytoDay'
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;
var Link = require('react-router-dom').Link;


class Forecast extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      load: true,
      forecastInfo: []
    }
    this.getData=this.getData.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount () {
    this.city = queryString.parse(this.props.location.search).city;
    this.getData(this.city);
    }

  componentWillReceiveProps(nextProps) {
    this.city = queryString.parse(nextProps.location.search).city;
    this.getData(this.city);
  }

  getData (city) {
    this.setState(() => {
      return{
        loading: true
      }
    })

    api.getForcast(city)
      .then((res) => {
        this.setState(() => {
          return {
            load: false,
            forecastInfo: res
          }
        })
      })
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
        <Header title='5 Day' />
        {this.state.load === true
          ? <Loading text='Checking' />
          : <div>
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
