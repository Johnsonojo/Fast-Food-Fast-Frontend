import { GET_ALL_MENU, GET_ALL_MENU_PASS_MSG, GET_ALL_MENU_FAIL_MSG } from '../actions/types';

const initialState = { allMenu: [], message: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MENU:
      return { ...state, allMenu: action.payload };
    case GET_ALL_MENU_PASS_MSG:
      return { ...state, message: action.payload };
    case GET_ALL_MENU_FAIL_MSG:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
