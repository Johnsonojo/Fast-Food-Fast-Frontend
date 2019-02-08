import axios from '../utils/axiosInstance';
import { GET_ALL_MENU, GET_ALL_MENU_PASS_MSG, GET_ALL_MENU_FAIL_MSG } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getAllMenu = () => async (dispatch) => {
  try {
    const response = await axios.get('/menu');
    const { data, message } = response.data;
    dispatch({ type: GET_ALL_MENU, payload: data });
    dispatch({ type: GET_ALL_MENU_PASS_MSG, payload: message });
  } catch (error) {
    dispatch({ type: GET_ALL_MENU_FAIL_MSG, payload: error.response.data });
  }
};
