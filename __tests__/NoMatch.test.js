import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import NoMatch from '../src/components/NoMatch';

describe('<NoMatch />', () => {
  test('NoMatch component should render', () => {
    const { getByText } = render(<NoMatch />);
    expect(getByText('404 PAGE NOT FOUND')).toBeInTheDocument();
  });
});
