import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { LoginUser } from '../../../actions';
import MenuNav from '../../MenuNav';
import PreLoader from '../../PreLoader';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getFormValues = () => {
    const { email, password } = this.state;

    return {
      email,
      password,
    };
  };

  submit = async (event) => {
    event.preventDefault();
    const formValues = this.getFormValues();
    this.setState({ isLoading: true });

    await this.props.LoginUser(formValues);
    if (this.props.message.status !== 'success') {
      await toastr.error('Incorrect credentials');
      return false;
    }
    toastr.success('Your login was successful');
    await this.props.history.push('/menu');
    return false;
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <MenuNav />
        <div>
          <h2 className="topmessage">Welcome</h2>
          <hr className="w-50" />
          <h2 className="topmessage">Login</h2>
          <form action="" id="login" onSubmit={this.submit}>
            <div className="container">
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
                placeholder="Enter Password"
                id="password"
                value={password}
                name="password"
                required
                onChange={this.handleInputChange}
              />
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <div>
                <button className="btn btn-pri w-100" type="submit">
                  Login
                </button>
                {this.state.isLoading && <PreLoader customClasses="auth-spinner" />}
              </div>
              <p className="form-extra-info text-center">
                No account yet? Create one
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.auth.user,
});

export default connect(
  mapStateToProps,
  { LoginUser },
)(Login);
