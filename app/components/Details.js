import React from 'react';
import Header from './Header';
import DaytoDay from './DaytoDay';
import utils from '../utils/Conversions';
var convertTemp = utils.convertTemp;
var Link = require('react-router-dom').Link;

class Details extends React.Component {
  render() {
    var props = this.props.location.state;
    return (
      <div>
        <Header title='Details' />
        <div>
          <Link className='btn btn-success'
                to={{pathname: '/forecast',
                      search:'?city=' + props.city}}>
                Back to Overview
          </Link>
          <DaytoDay day={props} />
          <div className='description-container'>
            <p>{props.city}</p>
            <p>{props.weather[0].description}</p>
            <p>High: {convertTemp(props.temp.max)} degrees</p>
            <p>Low: {convertTemp(props.temp.min)} degrees</p>
            <p>Humidity: {props.humidity}%</p>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Details;
