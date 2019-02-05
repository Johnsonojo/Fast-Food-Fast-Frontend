import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <div className="sidenav index">
      <label htmlFor="toggle">&#9776;</label>
      <input type="checkbox" id="toggle" />
      <div className="menu">
        <Link to="/" className="sitelink">
          Fast-Food-Fast
        </Link>
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </div>
    </div>
    <div className="main-wrapper home">
      <div className="landing">
        <h2>Fast-Food-Fast is a food delivery service app for a restaurant</h2>
        <Link to="/login">
          <button className="btn btn-pri">CHECK IT OUT</button>
        </Link>
      </div>
    </div>

    <div className="footer change">
      <p>&copy; 2018. fast-food-fast. All images from Google.</p>
    </div>
  </Fragment>
);

export default Home;
