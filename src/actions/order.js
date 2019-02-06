import axios from '../utils/axiosInstance';
import {
  POST_ORDER,
  POST_ORDER_PASS_MSG,
  POST_ORDER_FAIL_MSG,
  GET_ORDERS,
  GET_ORDERS_FAIL_MSG,
  DELETE_ORDERS,
  DELETE_ORDERS_FAIL_MSG,
} from './types';
import * as authUtils from '../utils/auth';

export const postOrder = orderData => async (dispatch) => {
  try {
    const userToken = authUtils.getToken();
    axios.defaults.headers.common.token = userToken;
    const response = await axios.post('/orders', orderData);
    const { data, message } = response.data;

    dispatch({ type: POST_ORDER, payload: data });
    dispatch({ type: POST_ORDER_PASS_MSG, payload: message });
  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch({ type: POST_ORDER_FAIL_MSG, payload: errorMessage });
  }
};

export const getOrders = userId => async (dispatch) => {
  try {
    const userToken = authUtils.getToken();
    axios.defaults.headers.common.token = userToken;

    const response = await axios.get(`users/${userId}/orders`, userId);
    const { data } = response.data;
    dispatch({ type: GET_ORDERS, payload: data.reverse() });
  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch({ type: GET_ORDERS_FAIL_MSG, payload: errorMessage });
  }
};

export const deleteOrder = (userId, orderId) => async (dispatch) => {
  try {
    const userToken = authUtils.getToken();
    axios.defaults.headers.common.token = userToken;

    const response = await axios.delete(`/users/${userId}/orders/${orderId}`);
    dispatch({ type: DELETE_ORDERS, payload: orderId });
  } catch (error) {
    dispatch({ type: DELETE_ORDERS_FAIL_MSG, payload: error.response });
  }
};
