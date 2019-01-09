import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import Signup from '../src/components/Signup';

describe('<Signup />', () => {
  test('Signup component should render', () => {
    const { getByText } = render(<Signup />);
    expect(getByText('This is Fast Food Fast Signup Page')).toBeInTheDocument();
  });
});
