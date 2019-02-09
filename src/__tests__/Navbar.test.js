import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from 'react-testing-library';
import { renderWithRedux } from '../__mocks__/helpers';
import Navbar from '../components/Navbar';

const history = createMemoryHistory({ initialEntries: ['/menu'] });

describe('<Navbar/>', () => {
  let NavComponent;
  test('', () => {
    const ui = (
      <Router history={history}>
        <Navbar />
      </Router>
    );
    NavComponent = renderWithRedux(ui);
    const { getByText } = NavComponent;
    expect(getByText(/Logout/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Logout/i));
  });
});
