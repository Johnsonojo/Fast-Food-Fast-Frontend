import React from 'react';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UserAllMenu from './UserAllMenu';
import axiosInstance from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';

const history = createMemoryHistory({ initialEntries: ['/menu'] });

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe('<UserAllMenu/>', () => {
  let AllMenuComponent;

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it fetches all menu on componentDidMount', async () => {
    const ui = (
      <Router history={history}>
        <UserAllMenu />
      </Router>
    );

    AllMenuComponent = renderWithRedux(ui);
    axiosMock.onGet().replyOnce(200, {
      data: [
        {
          id: 6,
          foodname: 'meatpie',
          foodprice: '100',
          foodimage: 'eynewToken',
        },
        {
          id: 7,
          foodname: 'Shawarma',
          foodprice: '100',
          foodimage: 'eynewToken',
        },
      ],
      message: 'All menu fetched successfully',
    });
    const { getByText, container } = AllMenuComponent;
    await waitForDomChange({ container });
    const orderBtn = container.querySelector('button.btn.order-btn');
    expect(getByText(/click to order/i)).toBeInTheDocument();

    fireEvent.click(orderBtn);
  });

  test('it fetches all menu on componentDidMount', async () => {
    const ui = (
      <Router history={history}>
        <UserAllMenu />
      </Router>
    );

    AllMenuComponent = renderWithRedux(ui);
    axiosMock.onGet().replyOnce(500, {
      data: [{}],
      message: 'Error fetching menu',
    });
    const { getByText, container } = AllMenuComponent;
    await waitForDomChange({ container });
    expect(getByText(/available food/i)).toBeInTheDocument();
  });
});
