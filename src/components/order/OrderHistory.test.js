import React from 'react';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import OrderHistory from './OrderHistory';
import axiosInstance from '../../utils/axiosInstance';
import * as auth from '../../utils/auth';
import { renderWithRedux } from '../../__mocks__/helpers';

auth.getDecodedToken = jest.fn(() => ({ username: 'johndoe', id: 1 }));

const history = createMemoryHistory({ initialEntries: ['/order-history'] });

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe('<OrderHistory/>', () => {
  let OrderHistoryComponent;

  beforeEach(() => {
    axiosMock.onGet().replyOnce(200, {
      data: [
        {
          id: 6,
          foodname: 'meatpie',
          totalamount: 100,
          username: 'Johnson',
          address: 'amity',
          status: 'new',
        },
        {
          id: 7,
          foodname: 'Shawarma',
          totalamount: 100,
          username: 'Johnson',
          address: 'agric',
          status: 'new',
        },
      ],
    });
  });

  afterEach(() => {
    axiosMock.reset();
    auth.getDecodedToken.mockReset();
  });

  afterAll(() => {
    axiosMock.restore();
    auth.getDecodedToken.mockRestore();
  });

  test('it fetches all users orders on componentDidMount', async () => {
    const ui = (
      <Router history={history}>
        <OrderHistory />
      </Router>
    );

    OrderHistoryComponent = renderWithRedux(ui, {
      initialState: { order: { allOrder: [] }, auth: { user: { data: { token: 'fakeToken' } } } },
    });

    const { container, getByText } = OrderHistoryComponent;
    await waitForDomChange({ container });
    axiosMock.onDelete().replyOnce(200);
    fireEvent.click(getByText(/Delete/i));
    await waitForDomChange({ container });
  });
});
