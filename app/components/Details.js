import React from 'react';
import Header from './Header';
import DaytoDay from './DaytoDay';
import utils from '../utils/Conversions';
var convertTemp = utils.convertTemp;
var Link = require('react-router-dom').Link;

/*Details renders the High, Low, and humidity. Props are passed from forecast.
also calls DaytoDay to render the date and weather image. Link creates a button
that takes the user back to the forecast component.*/
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
            <p>High: {convertTemp(props.temp.max)} F</p>
            <p>Low: {convertTemp(props.temp.min)} F</p>
            <p>Humidity: {props.humidity}%</p>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Details;
