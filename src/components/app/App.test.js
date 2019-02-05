import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import App from './App';

test('Home component should render', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  expect(
    getByText('Fast-Food-Fast is a food delivery service app for a restaurant'),
  ).toBeInTheDocument();
});
