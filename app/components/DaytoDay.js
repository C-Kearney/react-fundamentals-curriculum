import React from 'react';
import utils from '../utils/Conversions';
var getDate = utils.getDate;

function DaytoDay (props) {
  var date = getDate(props.day.dt);
  var icon = props.day.weather[0].icon;
  return (
    <div onClick={props.onClick} className='dayContainer'>
      <img className='weather' src={'/app/images/weather-icons/' + icon + '.svg'} alt='Weather' />
      <h2 className='subheader'>{date}</h2>
    </div>
  )
}

module.exports = DaytoDay;
