import React from 'react';
import PropTypes from 'prop-types';
var Link = require('react-router-dom').Link;

class Location extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      zipcode: ''
    };

    this.handleZipUpdate = this.handleZipUpdate.bind(this);
    this.handleZipSubmit = this.handleZipSubmit.bind(this);
  }

  handleZipSubmit () {
    this.props.onZipSubmit(this.state.zipcode)

    this.setState(() => {
      return {
        zipcode: ''
      }
    })
  }

  handleZipUpdate (e) {
    var zip = e.target.value;
    this.setState(() => {
      return {
        zipcode: zip
      }
    });
  }

  render() {
    var zip = this.state.zipcode
    return(
      <div
        className='zipcode-container'
        style={{flexDirection: this.props.direction}}>
        <input
          className='form-control'
          onChange={this.handleZipUpdate}
          placeholder='Downingtown, Pennsylvania'
          type='text'
          value={this.state.zipcode} />
          <Link
            to={{
              pathname: '/forecast',
              search: `?city=` + zip}}
          >
            <button
              type='button'
              style={{margin: 10}}
              className='btn btn-success'
              onClick={this.handleZipSubmit}
              disabled={!this.state.zipcode}>
                Get Weather
            </button>
          </Link>
      </div>
    )
  }
}

Location.defaultProps = {
  direction: 'column'
}

Location.propTypes = {
  direction: PropTypes.string,
}

module.exports = Location;
