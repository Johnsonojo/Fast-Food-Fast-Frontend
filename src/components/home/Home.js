import React from 'react';
import '../../../public/assets/css/styles.css';

const Home = () => (
  <div>
    <div className="sidenav index">
      <label htmlFor="toggle">&#9776;</label>
      <input type="checkbox" id="toggle" />
      <div className="menu">
        <a href="index.html" className="sitelink">
          Fast-Food-Fast
        </a>
        <a href="login.html" className="link">
          Login
        </a>
        <a href="signup.html" className="link">
          Sign Up
        </a>
      </div>
    </div>

    <div className="main-wrapper home">
      <div className="landing">
        <h2>Fast-Food-Fast is a food delivery service app for a restaurant</h2>
        <a href="login.html">
          <button className="btn btn-pri">CHECK IT OUT</button>
        </a>
      </div>
    </div>
    <div className="footer change">
      <p>&copy; 2018. fast-food-fast. All images from Google.</p>
    </div>
  </div>
);

export default Home;
