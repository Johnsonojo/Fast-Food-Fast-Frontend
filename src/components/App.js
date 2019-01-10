import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './Login';
import Signup from './Signup';
import NoMatch from './NoMatch';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default App;
