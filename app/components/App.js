import React from 'react';
import Home from './Home.js';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
import Forecast from './Forecast';
import Details from './Details';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/forecast' component={Forecast} />
          <Route path='/details/:city' component={Details} />
          <Route render={() => {
            return <p>Location Not Found</p>
          }} />
        </Switch>
      </Router>
    )
  }
}

module.exports = App
