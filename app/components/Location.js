import React from 'react';
import PropTypes from 'prop-types';
var Link = require('react-router-dom').Link;
/*The Location component renders a field and button that submits the location to
the Forecast component via queerystring that will then be parsed to be sent to
the api request.*/
class Location extends React.Component {
  //set up the default value zipcode.
  constructor(props) {
    super(props)
    this.state={
      zipcode: ''
    };
    //bind the funcitons used to this instance of the component
    this.handleZipUpdate = this.handleZipUpdate.bind(this);
    this.handleZipSubmit = this.handleZipSubmit.bind(this);
  }
  //when a new zipcode is submitted reset the value of the container to an empty string
  handleZipSubmit () {
    this.setState(() => {
      return {
        zipcode: ''
      }
    })
  }
  //allows the user to type in the input field.
  handleZipUpdate (e) {
    var zip = e.target.value;
    this.setState(() => {
      return {
        zipcode: zip
      }
    });
  }
  /*Render a field and a button that will flex in a direciton provided by the user.
  The button will be deactivated until something has been entered into the input
  field. The button links to the Forecast app and passes allong a queerystirng to
  the Forecast component.*/
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
//set default props should the user not provide a value.
Location.defaultProps = {
  direction: 'column'
}
//ensure the direction prop is passed as a string.
Location.propTypes = {
  direction: PropTypes.string,
}

module.exports = Location;
