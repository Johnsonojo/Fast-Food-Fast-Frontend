import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions';

class Navbar extends Component {
  onLogout = () => {
    const { logoutUser: logout } = this.props;
    localStorage.clear();
    logout();
  };

  render() {
    return (
      <Fragment>
        <div className="sidenav">
          <label htmlFor="toggle">&#9776;</label>
          <input type="checkbox" id="toggle" />
          <div className="menu">
            <Link to="/" className="sitelink">
              Fast-Food-Fast
            </Link>
            <Link to="/menu" className="link">
              Available Food
            </Link>
            <Link to="/order-history" className="link">
              My Order
            </Link>
            <Link to="/login" className="link" onClick={this.onLogout}>
              Logout
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logoutUser },
)(Navbar);
