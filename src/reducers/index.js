import { combineReducers } from 'redux';
import authReducers from './auth';
import menuReducers from './menu';
import orderReducers from './order';

export default combineReducers({
  auth: authReducers,
  menu: menuReducers,
  order: orderReducers,
});
