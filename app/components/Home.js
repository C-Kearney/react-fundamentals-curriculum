import React from 'react';
import Location from './Location';
import Header from './Header.js';

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
            onZipSubmit={function(){}}
            onZipUpdate={function(){}}
            zipcode={123} />
        </div>
      </div>
    )
  }
}

module.exports = Home
