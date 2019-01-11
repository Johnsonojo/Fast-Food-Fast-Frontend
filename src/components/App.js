import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NoMatch from './NoMatch';
import Navbar from './Navbar';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
