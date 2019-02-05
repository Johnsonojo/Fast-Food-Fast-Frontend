// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import toastr from 'toastr';
// import { LoginUser } from '../../../actions';

// class Login extends Component {
//   state = {
//     email: '',
//     password: '',
//   };

//   handleInputChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   getFormValues = () => {
//     const { email, password } = this.state;

//     return {
//       email,
//       password,
//     };
//   };

//   submit = async (event) => {
//     event.preventDefault();
//     const formValues = this.getFormValues();

//     await this.props.LoginUser(formValues);
//     if (this.props.message.status !== 'success') {
//       await toastr.error('Incorrect credentials');
//       return false;
//     }
//     toastr.success('Your login was successful');
//     await this.props.history.push('/menu');
//     return false;
//   };

//   render() {
//     const { email, password } = this.state;
//     return (
//       <div>
//         <div className="sidenav index">
//           <label htmlFor="toggle">&#9776;</label>
//           <input type="checkbox" id="toggle" />
//           <div className="menu">
//             <Link to="/" className="sitelink">
//               Fast-Food-Fast
//             </Link>
//             <Link to="/login" className="link">
//               Login
//             </Link>
//             <Link to="/signup" className="link">
//               Sign Up
//             </Link>
//           </div>
//         </div>
//         <h2 className="topmessage">Welcome Back</h2>
//         <hr className="w-50" />
//         <h2 className="topmessage">Login</h2>

//         <form action="" id="login" onSubmit={this.submit}>
//           <div className="container">
//             <label htmlFor="email">
//               <b>Email</b>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Email"
//               id="email"
//               value={email}
//               name="email"
//               required
//               onChange={this.handleInputChange}
//             />

//             <label htmlFor="password">
//               <b>Password</b>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               id="password"
//               value={password}
//               name="password"
//               required
//               onChange={this.handleInputChange}
//             />
//             <label>
//               <input type="checkbox" name="remember" /> Remember me
//             </label>
//             <div>
//               <button className="btn btn-pri w-100" type="submit">
//                 Login
//               </button>
//             </div>
//             <p className="form-extra-info text-center">
//               Don't have an account? Create one
//               <Link to="/signup">
//                 <b> here</b>
//               </Link>
//             </p>
//           </div>
//         </form>

//         <div className="footer change">
//           <p>&copy; 2018. fast-food-fast. All images from Google.</p>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   message: state.auth.user,
// });

// export default connect(
//   mapStateToProps,
//   { LoginUser },
// )(Login);
