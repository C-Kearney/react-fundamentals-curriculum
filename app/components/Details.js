import React from 'react';
import Header from './Header';
import DaytoDay from './DaytoDay';

class Details extends React.Component {
  render() {
    var props = this.props.location.state;
    return (
      <div>
        <Header title='Details' />
        <div>
          <DaytoDay day={props}/>
        </div>
      </div>
    )
  }
}

module.exports = Details;
