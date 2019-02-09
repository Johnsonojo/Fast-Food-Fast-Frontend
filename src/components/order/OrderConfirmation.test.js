import React from 'react';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import OrderConfirmation from './OrderConfirmation';
import axiosInstance from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';

const history = createMemoryHistory({ initialEntries: ['/order-confirmation'] });

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe('<OrderConfirmation/>', () => {
  const order = JSON.stringify({ foodName: 'Glazed Donought', foodPrice: '250', id: 4 });
  beforeEach(() => {
    localStorage.setItem('order', order);
  });
  let OrderConfirmComponent;

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);
  afterEach(jest.resetAllMocks);

  const initialState = {
    auth: {
      user: {
        data: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJKb2huc29uIiwiZW1haWwiOiJqb2huc29uQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU0OTY0MjYwMCwiZXhwIjoxNTQ5NzI5MDAwfQ.p8Ck8Mf4GVrZSqW2KuJrke6cXs5EuKgGjeQVHRly62o',
        },
        status: 'success',
      },
    },
    menu: {
      allMenu: [
        {
          id: 9,
          foodname: 'Jollof Rice',
          foodprice: '900',
          foodimage: 'https://bit.ly/2D68gun',
          created_date: '2019-02-05T19:05:56.796Z',
          modified_date: '2019-02-05T19:05:56.796Z',
        },
      ],
      message: 'All menu fetched',
    },
    order: {
      allOrder: [
        {
          id: 34,
          foodname: 'Yamarita',
          foodprice: 900,
          qty: 9,
          totalamount: 8100,
          orderstatus: 'New',
          address: 'Block M Timehin Street Agbede',
          phone: '2348180799821',
          created_date: '2019-02-08T16:20:28.128Z',
          modified_date: '2019-02-08T16:20:28.128Z',
          user_id: 1,
        },
      ],
      message: 'Order placed successfully',
    },
  };

  test('it fetches all users orders on componentDidMount', async () => {
    const ui = (
      <Router history={history}>
        <OrderConfirmation history={history} />
      </Router>
    );

    OrderConfirmComponent = renderWithRedux(ui, {
      initialState,
    });

    const { getByText } = OrderConfirmComponent;
    const payload = {
      status: 'success',
      message: 'Order placed successfully',
      data: [
        {
          id: 35,
          foodname: 'Glazed Donought',
          foodprice: 250,
          qty: 1,
          totalamount: 250,
          orderstatus: 'New',
          address: 'University Road 101017 Akoka',
          phone: '2348180799821',
          created_date: '2019-02-08T17:24:13.074Z',
          modified_date: '2019-02-08T17:24:13.074Z',
          user_id: 1,
        },
      ],
    };
    axiosMock.onPost().replyOnce(200, payload);
    expect(getByText(/Place order/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Place order/i));

    await waitForDomChange();
    expect(getByText(/Order posted successfully/i)).toBeInTheDocument();
  });
});
