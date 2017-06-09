import React from 'react';
import utils from '../utils/Conversions';
var getDate = utils.getDate;

/*DaytoDay funciton creates the image header containing both an icon and the
date of the object. It takes in props provided from the forecast component. It
also utilizes the get date funciton from the utils directory*/
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
