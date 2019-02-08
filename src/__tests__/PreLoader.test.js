import React from 'react';
import { render } from 'react-testing-library';
import PreLoader from '../components/PreLoader';

describe('PreLoader', () => {
  test('PreLoader component should render', () => {
    const { getByTestId } = render(<PreLoader />);

    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
