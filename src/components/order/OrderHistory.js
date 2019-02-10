import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { getOrders, deleteOrder } from '../../actions/order';
import { getDecodedToken } from '../../utils/auth';
import Navbar from '../Navbar';

class OrderHistory extends Component {
  async componentDidMount() {
    const userId = getDecodedToken().id;
    await this.props.getOrders(userId);
  }

  deletingOrder = async (orderId) => {
    const userId = getDecodedToken().id;
    await this.props.deleteOrder(userId, orderId);
    toastr.success('Order deleted successfully');
  };

  renderOrderHistory = () => {
    const { username } = getDecodedToken();
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
            <button
              className="btn btn-sec-danger delBtn"
              onClick={() => this.deletingOrder(oneOrder.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    const { order } = this.props;
    return (
      <div>
        <Navbar />
        <div className="app">
          <div className="dash-welcome">
            <h2 className="topmessage">Your Orders</h2>
            <hr />
          </div>
        </div>
        {order.allOrder && order.allOrder.length === 0 ? (
          <div className="container no-order">
            <div className="no-order-statement">
              <h1>You have no order yet</h1>
            </div>
          </div>
        ) : (
          <div className="container">{this.renderOrderHistory()}</div>
        )}
        <div className="footer change">
          <p>&copy; 2018. fast-food-fast. All images from Google.</p>
        </div>
      </div>
    );
  }
}

OrderHistory.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object]).isRequired,
  deleteOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  order: state.order,
  message: state.order.message,
});

export default connect(
  mapStateToProps,
  { getOrders, deleteOrder },
)(OrderHistory);
