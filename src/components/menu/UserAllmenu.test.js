import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {
  render, fireEvent, wait, waitForDomChange,
} from 'react-testing-library';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import axiosInstance from '../../utils/axiosInstance';
import reducers from '../../reducers';
import UserAllMenu from './UserAllMenu';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/', '/menu'] });
history.push = jest.fn();

const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('Menu Component', () => {
  let AllMenuComponent;
  beforeEach(() => {
    axiosMock.onGet().replyOnce(200, {
      allMenu: [
        {
          id: 6,
          foodname: 'meatpie',
          foodprice: '100',
          foodimage: 'eynewToken',
        },
        {
          id: 6,
          foodname: 'Shawarma',
          foodprice: '100',
          foodimage: 'eynewToken',
        },
      ],
      message: 'All menu fetched successfully',
    });
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);
  afterEach(jest.resetAllMocks);
  //   afterEach(axiosMock.restore);
  //     afterAll(history.push.mockRestore);
  test('fetches all menu on componentDidMount', async () => {
    const ui = (
      <Router history={history}>
        <UserAllMenu history={history} />
      </Router>
    );
    AllMenuComponent = renderWithRedux(ui, store);
    const { getByText } = AllMenuComponent;
    await wait(() => expect(getByText(/meatpie/i)).toBeInTheDocument());
  });
});
