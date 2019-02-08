import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMenu } from '../../actions/menu';
import { logoutUser } from '../../actions';
import PreLoader from '../PreLoader';

class UserAllMenu extends Component {
  state = {
    message: false,
    isFetching: true,
  };

  async componentDidMount() {
    await this.props.getAllMenu();
    this.setState({ isFetching: false });
  }

  clickToOrder = (event, foodName, foodPrice, id) => {
    event.preventDefault();
    this.setState({ isFetching: true });
    const orderDetails = { foodName, foodPrice, id };
    window.localStorage.setItem('order', JSON.stringify(orderDetails));
    this.setState({ isFetching: false });
  };

  onLogout = () => {
    const { logoutUser: logout } = this.props;
    localStorage.clear();
    logout();
  };

  renderMenu = () => {
    const { menu } = this.props;
    const { isFetching } = this.state;

    if (!isFetching) {
      return menu.allMenu.map(food => (
        <div className="card-group" key={food.id}>
          <div className="card">
            <img src={food.foodimage} alt={food.foodname} />
            <hr />
            <h3>{food.foodname}</h3>
            <p className="price">&#8358;{food.foodprice}</p>
            <hr />
            <button
              type="button"
              className="btn order-btn"
              onClick={event => this.clickToOrder(event, food.foodname, food.foodprice, food.id)}
            >
              <Link to="/order-confirmation">Click to Order</Link>
            </button>
          </div>
        </div>
      ));
    }
    return <PreLoader />;
  };

  render() {
    return (
      <div>
        <div className="sidenav">
          <label htmlFor="toggle">&#9776;</label>
          <input type="checkbox" id="toggle" />
          <div className="menu">
            <Link to="/" className="sitelink">
              Fast-Food-Fast
            </Link>
            <Link to="/menu" className="link">
              Available Food
            </Link>
            <Link to="/order-history" className="link">
              My Order
            </Link>
            <Link to="/login" className="link" onClick={this.onLogout}>
              Logout
            </Link>
          </div>
        </div>
        <div className="app">
          <div className="dashboard">
            <div className="dash-welcome">
              <h2 className="topmessages" />
            </div>
            <div>
              <h3 className="topmessage">Available Food Items</h3>
            </div>
            <hr />
            <div className="card-row">{this.renderMenu()}</div>
          </div>
        </div>
        <div className="footer change">
          <p>&copy; 2018. fast-food-fast. All images from Google.</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(
  mapStateToProps,
  { getAllMenu, logoutUser },
)(UserAllMenu);
