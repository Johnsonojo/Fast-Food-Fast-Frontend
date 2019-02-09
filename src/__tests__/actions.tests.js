import MockAdapter from 'axios-mock-adapter';
import {
  SIGNUP,
  SIGNUP_FAIL_MSG,
  LOGIN,
  LOGIN_FAIL_MSG,
  GET_ALL_MENU,
  GET_ALL_MENU_PASS_MSG,
  GET_ALL_MENU_FAIL_MSG,
  POST_ORDER,
  POST_ORDER_PASS_MSG,
  POST_ORDER_FAIL_MSG,
  GET_ORDERS,
  GET_ORDERS_FAIL_MSG,
  DELETE_ORDERS,
  DELETE_ORDERS_FAIL_MSG,
} from '../actions/types';
import { SignupUser, LoginUser, logoutUser } from '../actions';
import { getAllMenu } from '../actions/menu';
import axios from '../utils/axiosInstance';
import * as authUtils from '../utils/auth';
import { postOrder, deleteOrder, getOrders } from '../actions/order';

const axiosMock = new MockAdapter(axios, { delayResponse: 0 });

describe('Redux actions', () => {
  const dispatch = jest.fn();
  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  describe('signup action', () => {
    test('call dispatch with correct type', async () => {
      const payload = {
        data: {
          id: 6,
          username: 'johnwick',
          email: 'johnwik@gmail.com',
          token: 'eynewToken',
        },
        status: 'success',
      };
      await axiosMock.onPost().replyOnce(201, payload);
      await SignupUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: SIGNUP, payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = {
        error: {
          response: {
            data: [{ message: 'not found' }],
          },
        },
      };
      await axiosMock.onPost().replyOnce(500, payload);
      await SignupUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: SIGNUP_FAIL_MSG, payload });
    });

    test('logoutUser', () => {
      expect(authUtils.getToken()).toBe('eynewToken');
      logoutUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenLastCalledWith({ type: 'LOG_OUT' });
    });
  });

  describe('login action', () => {
    test('call dispatch with correct type', async () => {
      const payload = {
        data: {
          token: 'eynewToken',
        },
        status: 'success',
      };
      await axiosMock.onPost().replyOnce(200, payload);
      await LoginUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LOGIN, payload });
    });

    test('call dispatch with correct type', async () => {
      const payload = {
        error: {
          response: {
            data: [{ message: 'not successful' }],
          },
        },
      };
      await axiosMock.onPost().replyOnce(500, payload);
      await LoginUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: LOGIN_FAIL_MSG, payload });
    });
  });

  describe('All menu action', () => {
    test('call dispatch with correct type of GET_ALL_MENU', async () => {
      const payload = {
        data: [
          {
            id: 6,
            foodname: 'meatpie',
            foodprice: '100',
            foodimage: 'eynewToken',
          },
        ],
        message: 'Menu fetched successfully',
      };
      await axiosMock.onGet().replyOnce(201, payload);
      await getAllMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: GET_ALL_MENU, payload: payload.data });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: GET_ALL_MENU_PASS_MSG,
        payload: payload.message,
      });
    });

    test('call dispatch with correct type of', async () => {
      const payload = {
        data: {
          message: 'Menu fetching not successful',
        },
      };
      await axiosMock.onGet().replyOnce(500, payload);
      await getAllMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_ALL_MENU_FAIL_MSG,
        payload,
      });
    });
  });

  describe('Post order action', () => {
    test('call dispatch with correct type of POST_ORDER', async () => {
      const payload = {
        data: {
          id: 6,
          foodname: 'meatpie',
          foodprice: '100',
          foodimage: 'eynewToken',
          qty: 200,
          amount: 20000,
          address: 'amity',
          phone: '2348180799345',
          city: 'lagos',
        },
        message: 'Order posted successfully',
      };
      await axiosMock.onPost().replyOnce(201, payload);
      await postOrder()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: POST_ORDER, payload: payload.data });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: POST_ORDER_PASS_MSG,
        payload: payload.message,
      });
    });

    test('call dispatch with correct type of POST', async () => {
      const payload = {
        message: 'Menu fetching not successful',
      };
      await axiosMock.onPost().replyOnce(500, payload);
      await postOrder()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: POST_ORDER_FAIL_MSG,
        payload: payload.message,
      });
    });
  });

  describe('Delete order action', () => {
    test('call dispatch with correct type of DELETE_ORDER', async () => {
      await axiosMock.onDelete().replyOnce(201);
      await deleteOrder(1, 1)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_ORDERS, payload: 1 });
    });

    test('call dispatch with correct type of DELETE_ORDER_FAIL', async () => {
      const payload = {
        data: {
          messsge: 'order deleting not successful',
        },
      };
      await axiosMock.onDelete().replyOnce(500, payload);
      await deleteOrder(1, 1)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: DELETE_ORDERS_FAIL_MSG,
        payload,
      });
    });
  });

  describe('Get orders action', () => {
    test('call dispatch with correct type of GET_ORDERS', async () => {
      const payload = {
        data: [
          {
            id: 6,
            foodname: 'meatpie',
            foodprice: '100',
            foodimage: 'eynewToken',
            amount: 20000,
            address: 'amity',
            phone: '2348180799345',
            city: 'lagos',
          },
        ],
        message: 'All user order fetched successfully',
      };
      await axiosMock.onGet().replyOnce(201, payload);
      await getOrders()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_ORDERS, payload: payload.data });
    });

    test('call dispatch with correct type of GET_ORDERS_FAIL', async () => {
      const payload = {
        data: {
          message: 'User order fetching not successful',
        },
      };
      await axiosMock.onPost().replyOnce(500, payload);
      await getOrders()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_ORDERS_FAIL_MSG,
        payload: payload.message,
      });
    });
  });
});
