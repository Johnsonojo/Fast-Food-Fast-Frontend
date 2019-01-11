import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
  <div>
    <h2 className="topmessage">Welcome Back</h2>
    <hr className="w-50" />
    <h2 className="topmessage">Login</h2>

    <form action="" id="login">
      <div className="container">
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input type="text" placeholder="Enter Email" id="email" required />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" id="password" required />
        <label>
          <input type="checkbox" name="remember" /> Remember me
        </label>
        <div>
          <button className="btn btn-pri w-100" type="submit">
            Login
          </button>
        </div>
        <p className="form-extra-info text-center">
          Don't have an account? Create one
          <Link to="/signup">
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

export default Login;
