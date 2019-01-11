import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => (
  <div>
    <h2 className="topmessage">Welcome</h2>
    <hr className="w-50" />
    <h2 className="topmessage">Signup</h2>
    <form id="signup">
      <div className="container">
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" id="username" required />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input type="text" placeholder="Enter Email" id="email" required />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" id="password" required />

        <label htmlFor="confirmPassword">
          <b>Confirm Password</b>
        </label>
        <input type="password" placeholder="Confirm Password" id="confirmPassword" required />

        <button className="btn btn-pri w-100" type="submit">
          Sign Up
        </button>
        <p>
          Do you already have an account? Login
          <Link to="/login">
            <b> here</b>
          </Link>
        </p>
      </div>
    </form>

    <div className="footer change">
      <p>&copy; 2018. fast-food-fast. All images from Google.</p>
    </div>
  </div>
);

export default Signup;
