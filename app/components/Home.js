import React from 'react';
import Location from './Location';
import Header from './Header.js';
/*creates the homepage with a line of text telling the user to use a city and
state ot search for the local weather. uses the Location component to create the
search field.*/
class Home extends React.Component {
  render() {
    return(
      <div className='container'>
        <div>
          <Header
            title='Home'/>
        </div>
        <div className='home-container' style={{backgroundImage: "url('app/images/pattern.svg')"}}>
          <h1 className='header'>Enter a City and State</h1>
          <Location
            direction='column'
            onZipUpdate={function(){}} />
        </div>
      </div>
    )
  }
}

module.exports = Home
