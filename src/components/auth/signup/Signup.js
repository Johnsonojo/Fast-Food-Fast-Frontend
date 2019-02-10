import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../../MessageBox';
import { SignupUser } from '../../../actions';
import MenuNav from '../../MenuNav';
import PreLoader from '../../PreLoader';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: false,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getFormValues = () => {
    const {
      username, email, password, confirmPassword,
    } = this.state;

    return {
      username,
      email,
      password,
      confirmPassword,
    };
  };

  comparePasswords = () => {
    const { password, confirmPassword } = this.state;

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return this.setState({ message: 'Passwords does not match!' });
      }
      return this.setState({ message: false });
    }
    return false;
  };

  submit = async (event) => {
    event.preventDefault();

    if (this.state.message) return;
    const formValues = this.getFormValues();
    this.setState({ isLoading: true });

    await this.props.SignupUser(formValues);
    this.setState({ message: this.props.message });
    await this.props.history.push('/menu');
  };

  render() {
    const {
      username, email, password, confirmPassword, message,
    } = this.state;

    return (
      <div>
        <MenuNav />
        <h2 className="topmessage">Signup</h2>
        <hr className="w-50" />
        <form id="signup" onSubmit={this.submit}>
          <div className="container">
            {message && <MessageBox message={message} />}
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              id="username"
              value={username}
              name="username"
              required
              onChange={this.handleInputChange}
            />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              id="email"
              value={email}
              name="email"
              required
              onChange={this.handleInputChange}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Minimum of 6 characters e.g Abcdef123"
              id="password"
              name="password"
              value={password}
              required
              onChange={this.handleInputChange}
              onKeyUp={this.comparePasswords}
            />

            <label htmlFor="confirmPassword">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              placeholder="Minimum of 6 characters e.g Abcdef123"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={this.handleInputChange}
              onKeyUp={this.comparePasswords}
            />

            <button className="btn btn-pri w-100" type="submit">
              Sign Up
            </button>
            {this.state.isLoading && <PreLoader customClasses="auth-spinner" />}
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
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.auth.message,
});

export default connect(
  mapStateToProps,
  { SignupUser },
)(Signup);
