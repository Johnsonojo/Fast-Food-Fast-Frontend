import {
  POST_ORDER,
  POST_ORDER_PASS_MSG,
  POST_ORDER_FAIL_MSG,
  GET_ORDERS,
  DELETE_ORDERS,
} from '../actions/types';

const initialState = { allOrder: [], message: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER:
      return { ...state, allOrder: action.payload };
    case GET_ORDERS:
      return { ...state, allOrder: action.payload };
    case POST_ORDER_PASS_MSG:
      return { ...state, message: action.payload };
    case POST_ORDER_FAIL_MSG:
      return { ...state, message: action.payload };
    case DELETE_ORDERS:
      return { ...state, allOrder: state.allOrder.filter(order => order.id !== action.payload) };
    default:
      return state;
  }
};
