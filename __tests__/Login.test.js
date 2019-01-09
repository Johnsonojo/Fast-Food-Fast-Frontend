import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import Login from '../src/components/Login';

describe('<Login />', () => {
  test('Login component should render', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Welcome To Fast Food Fast Login Page')).toBeInTheDocument();
  });
});
