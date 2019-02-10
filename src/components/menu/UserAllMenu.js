import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMenu } from '../../actions/menu';
import PreLoader from '../PreLoader';
import Navbar from '../Navbar';

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

    const orderDetails = { foodName, foodPrice, id };
    window.localStorage.setItem('order', JSON.stringify(orderDetails));
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
        <Navbar />
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(
  mapStateToProps,
  { getAllMenu },
)(UserAllMenu);
