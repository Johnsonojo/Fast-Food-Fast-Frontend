import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { postOrder } from '../../actions/order';
import Navbar from '../Navbar';

class OrderConfirmation extends Component {
  state = {
    order: [],
    qty: 1,
    amount: '',
    phone: '',
    address: '',
    city: '',
  };

  componentDidMount() {
    const userOrder = JSON.parse(localStorage.getItem('order'));
    this.setState({ order: userOrder });
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
    setTimeout(() => {
      const price = this.state.order.foodPrice;
      const { qty } = this.state;
      const quantity = Number(qty);
      const amount = price * quantity;
      this.setState({
        amount,
      });
    }, 50);
  };

  onSubmit = async () => {
    const { postOrder: postNewOrder } = this.props;
    const orderDetails = {
      ...this.state.order,
      qty: this.state.qty,
      amount: this.state.amount,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
    };
    await postNewOrder(orderDetails);
    if (this.props.message !== 'Order placed successfully') {
      await toastr.error('Order not posted successfully');
      return false;
    }
    toastr.success('Order posted successfully');
    await this.props.history.push('/order-history');
    return false;
  };

  render() {
    const { amount, order } = this.state;
    const selection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div>
        <Navbar />

        <h2 className="topmessage">Your Order Details</h2>

        <div className="order-summary">
          <div className="col-50">
            <div className="container">
              <h3 className="topmessag">Your Order</h3>
              <hr />
              <div className="order-content">
                <div>
                  <select onChange={this.handleChange} name="qty" className="order-content">
                    {selection.map(number => (
                      <option key={number}>{number}</option>
                    ))}
                  </select>
                  <p className="food-options">{order.foodName}</p>
                  <p>&#8358;{order.foodPrice}</p>
                </div>
              </div>
              <hr />
              <p>
                Total
                <span className="price" onChange={this.handleChange}>
                  <b>&#8358;{amount}</b>
                </span>
              </p>
            </div>
          </div>
          <br />
          <div className="col-50">
            <div className="container">
              <form action="./user-final-checkout.html">
                <div className="row">
                  <div className="col-50">
                    <h3 className="topmessag">Delivery Details</h3>
                    <hr />
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="+234"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="235 Ikorodu road"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Anthony"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="add-food">
                  <Link to="#">
                    <button className="btn btn-pri" onClick={this.onSubmit}>
                      Place Order
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />

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
  { postOrder },
)(OrderConfirmation);
