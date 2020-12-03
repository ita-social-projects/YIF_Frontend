import React from 'react';
import { render } from '@testing-library/react';
import Home from './home';

test('should render correctly', () => {
  const home = render(<Home />);

  expect(home).toMatchSnapshot();
});
