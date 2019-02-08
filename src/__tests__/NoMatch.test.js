import React from 'react';
import { render } from 'react-testing-library';
import NoMatch from '../components/NoMatch';

describe('<NoMatch />', () => {
  test('NoMatch component should render', () => {
    const { getByText } = render(<NoMatch />);
    expect(getByText('404 PAGE NOT FOUND')).toBeInTheDocument();
  });
});
