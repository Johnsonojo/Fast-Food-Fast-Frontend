// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { getAllMenu } from '../../actions/menu';

// class UserAllMenu extends Component {
//   state = {
//     message: false,
//   };

//   async componentDidMount() {
//     await this.props.getAllMenu();
//   }

//   clickToOrder = (event, foodName, foodPrice, id) => {
//     event.preventDefault();
//     const orderDetails = { foodName, foodPrice, id };
//     window.localStorage.setItem('order', JSON.stringify(orderDetails));
//   };

//   renderMenu = () => {
//     const { menu } = this.props;
//     return menu.allMenu.map(food => (
//       <div className="card-group" key={food.id}>
//         <div className="card">
//           <img src={food.foodimage} alt={food.foodname} />
//           <hr />
//           <h3>{food.foodname}</h3>
//           <p className="price">&#8358;{food.foodprice}</p>
//           <hr />
//           <button
//             className="btn order-btn"
//             onClick={event => this.clickToOrder(event, food.foodname, food.foodprice, food.id)}
//           >
//             <Link to="/order-confirmation">Click to Order</Link>
//           </button>
//         </div>
//       </div>
//     ));
//   };

//   render() {
//     return (
//       <div>
//         <div className="sidenav">
//           <label htmlFor="toggle">&#9776;</label>
//           <input type="checkbox" id="toggle" />
//           <div className="menu">
//             <Link to="/" className="sitelink">
//               Fast-Food-Fast
//             </Link>
//             <Link to="/menu" className="link">
//               Available Food
//             </Link>
//             <Link to="/users/:userId/orders" className="link">
//               My Order
//             </Link>
//             <Link to="/login" className="link">
//               Logout
//             </Link>
//           </div>
//         </div>
//         <div className="app">
//           <div className="dashboard">
//             <div className="dash-welcome">
//               <h2 className="topmessages">
//                 Welcome <span>Johnson</span>
//               </h2>
//             </div>
//             <div>
//               <h3 className="topmessage">Available Food Items</h3>
//             </div>
//             <hr />
//             <div className="card-row">{this.renderMenu()}</div>
//           </div>
//         </div>
//         <div className="footer change">
//           <p>&copy; 2018. fast-food-fast. All images from Google.</p>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => ({
//   menu: state.menu,
// });

// export default connect(
//   mapStateToProps,
//   { getAllMenu },
// )(UserAllMenu);
