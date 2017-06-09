import React from 'react';
import Location from './Location.js'
import PropTypes from 'prop-types';
/*Creaste a component that will render a header section with a title and a searchbox
that will allow the user ot search for a city from any page.*/
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title
    }
  }
  render(){
    return(
      <div className='header-back'>
        {this.state.title}
        <Location
          direction='row'
          onZipSubmit={function(){}}
          onZipUpdate={function(){}}
          zipcode={123} />
      </div>
    )
  }
}

Header.defaultProps = {
  title: 'Weather'
}

Header.propTypes = {
  title: PropTypes.string
}

module.exports = Header;
