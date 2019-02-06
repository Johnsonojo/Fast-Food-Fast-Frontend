import MockAdapter from 'axios-mock-adapter';
import {
  SIGNUP,
  SIGNUP_PASS_MSG,
  SIGNUP_FAIL_MSG,
  LOGIN,
  LOGIN_FAIL_MSG,
  GET_ALL_MENU,
  GET_ALL_MENU_PASS_MSG,
  GET_ALL_MENU_FAIL_MSG,
} from '../actions/types';
import { SignupUser, LoginUser } from '../actions';
import { getAllMenu } from '../actions/menu';
import axios from '../utils/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

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
        message: 'You signed up successfully',
      };
      await axiosMock.onPost().replyOnce(201, payload);
      await SignupUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: SIGNUP, payload: payload.data });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: SIGNUP_PASS_MSG,
        payload: payload.message,
      });
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
    test('call dispatch with correct type', async () => {
      const payload = {
        data: [
          {
            id: 6,
            foodname: 'meatpie',
            foodprice: '100',
            foodimage: 'eynewToken',
          },
        ],
        message: 'Orders fetched successfully',
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

    test('call dispatch with correct type', async () => {
      const payload = {
        // error: {
        // response: {
        data: [{ message: 'Order fetching not successful' }],
        // },
        // },
      };
      await axiosMock.onPost().replyOnce(500, payload);
      await getAllMenu()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_ALL_MENU_FAIL_MSG, payload });
    });
  });
});
