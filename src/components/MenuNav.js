import React from 'react';
import { Link } from 'react-router-dom';

const MenuNav = () => (
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
);

export default MenuNav;
