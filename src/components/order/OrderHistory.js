import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { getOrders } from '../../actions/order';
import { decoded } from '../../utils/auth';

class OrderHistory extends Component {
  async componentDidMount() {
    const userId = decoded.id;
    await this.props.getOrders(userId);
  }

  renderOrderHistory = () => {
    const { username } = decoded;
    const { order } = this.props;
    return order.allOrder.map(oneOrder => (
      <div className="admin-order-pane" key={oneOrder.id}>
        <div className="order-history-pane admin-order-history-pane">
          <div className="order-history-head">
            <h3>#{oneOrder.id}</h3>
            <h3>{oneOrder.foodname}</h3>
          </div>
          <hr />
          <div>
            <p>
              {username}&nbsp; - &nbsp;{oneOrder.address}
            </p>
          </div>
          <div className="order-history-foot">
            <h2>&#8358;{oneOrder.totalamount}</h2>
            <h4>
              Status:
              <span className="warning">{oneOrder.orderstatus}</span>
            </h4>
          </div>
          <hr />
          <div className="func-btn">
            {/* <button className="btn btn-sec">Accept</button> */}
            <button className="btn btn-sec-danger delBtn">Delete</button>
          </div>
        </div>
      </div>
    ));
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
            <Link to="/login" className="link">
              Logout
            </Link>
          </div>
        </div>
        <div className="app">
          <div className="dash-welcome">
            <h2 className="topmessage">Your Orders</h2>
            <hr />
          </div>
        </div>
        <div className="container">{this.renderOrderHistory()}</div>
        <div className="footer change">
          <p>&copy; 2018. fast-food-fast. All images from Google.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  message: state.order.message,
});

export default connect(
  mapStateToProps,
  { getOrders },
)(OrderHistory);
