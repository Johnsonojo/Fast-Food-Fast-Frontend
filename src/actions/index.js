import axios from '../utils/axiosInstance';
import {
  SIGNUP, SIGNUP_PASS_MSG, SIGNUP_FAIL_MSG, LOGIN, LOGIN_FAIL_MSG,
} from './types';
import * as authUtils from '../utils/auth';

export const SignupUser = formValues => async (dispatch) => {
  try {
    const response = await axios.post('/auth/signup', formValues);
    const { data } = response.data;
    authUtils.saveToken(data.token);
    dispatch({ type: SIGNUP, payload: data });
    dispatch({ type: SIGNUP_PASS_MSG, payload: 'You signed up successfully' });
  } catch (error) {
    const errorMessage = error.response.data;
    dispatch({ type: SIGNUP_FAIL_MSG, payload: errorMessage });
  }
};

export const LoginUser = formValues => async (dispatch) => {
  try {
    const response = await axios.post('/auth/login', formValues);
    const { data, status } = response.data;
    authUtils.saveToken(data.token);
    dispatch({ type: LOGIN, payload: { data, status } });
  } catch (error) {
    const errorMessage = error.response.data;
    dispatch({ type: LOGIN_FAIL_MSG, payload: errorMessage });
  }
};

export const logoutUser = () => {
  authUtils.removeToken();
  return { type: LOG_OUT };
};
