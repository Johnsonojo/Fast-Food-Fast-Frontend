import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../components/App";

/**
 * @description Represents the Routes Component
 * @returns {component} Routes
 */
const NoMatch = () => <h3>404 NOT FOUND</h3>;

const AppRouter = () => (
  <Router>
    <div>
      <nav />
      <Switch>
        <Route path="/" exact component={App} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
