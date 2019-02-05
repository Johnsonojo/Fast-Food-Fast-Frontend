import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'toastr/toastr.scss';
import Home from '../home/Home';
import Login from '../auth/login/Login';
import Signup from '../auth/signup/Signup';
import UserAllMenu from '../menu/UserAllMenu';
// import OrderConfirmation from '../order/OrderConfirmation';
// import OrderHistory from '../order/OrderHistory';
import NoMatch from '../NoMatch';

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {/* {/* <Route path="/menu" component={UserAllMenu} /> */}
        <Route path="/order-confirmation" component={OrderConfirmation} />
        <Route path="/order-history" component={OrderHistory} /> */}
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
