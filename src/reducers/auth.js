import {
  SIGNUP,
  // SIGNUP_PASS_MSG,
  SIGNUP_FAIL_MSG,
  LOGIN,
  LOG_OUT,
  LOGIN_FAIL_MSG,
} from '../actions/types';

const initialState = { user: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, user: action.payload };
    // case SIGNUP_PASS_MSG:
    //   return { ...state, message: action.payload };
    case SIGNUP_FAIL_MSG:
      return { ...state, message: action.payload };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGIN_FAIL_MSG:
      return { ...state, message: action.payload };
    case LOG_OUT:
      return { user: null };
    default:
      return state;
  }
};
