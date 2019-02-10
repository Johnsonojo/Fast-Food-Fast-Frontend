import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MenuNav from '../MenuNav';

const Home = () => (
  <Fragment>
    <MenuNav />
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
