import React from 'react';
import PropTypes from 'prop-types';
//set initial style for the text displayed on the page
var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};
/*the Loading component creates a line of text on the page to be displayed as an
API is being pinged. The user can supply a text and interval speed to be displayed if they wish for
something other than the default.*/
class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }
  //when the component mounts setup a timer to append dots to the text until a set value is reached
  componentDidMount() {
    var stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if(this.state.text ===stopper) {
        this.setState(() => {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState((prevState) => {
          return {
            text: prevState.text + '.'
          }
        });
      }
    }, this.props.speed)
  }
  //clear the interval vaue when the component unmounts from the DOM
  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
//display the entered text
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}
//set proptypes for the text and speed supplied.
Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};
//set default props should the user not supplly any.
Loading.defaultProps = {
  text: 'Loading',
  speed: 200
};

module.exports = Loading;
