import axios from '../utils/axiosInstance';
import {
  SIGNUP, SIGNUP_FAIL_MSG, LOGIN, LOGIN_FAIL_MSG, LOG_OUT,
} from './types';
import * as authUtils from '../utils/auth';

export const SignupUser = formValues => async (dispatch) => {
  try {
    const response = await axios.post('/auth/signup', formValues);
    const { data, status } = response.data;
    authUtils.saveToken(data.token);
    dispatch({ type: SIGNUP, payload: { data, status } });
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

export const logoutUser = () => (dispatch) => {
  authUtils.removeToken();
  return dispatch({ type: LOG_OUT });
};
