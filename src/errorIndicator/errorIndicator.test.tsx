import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'; // import react-testing methods

import ErrorIndicator from './index';

describe('ERROR INDICATOR', () => {
  test('render a block and check label', () => {
    const { getByText } = render(<ErrorIndicator />);
    expect(getByText(/Трясця/i)).toBeInTheDocument();
  });

  test('check the botton', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ErrorIndicator onClick={handleClick()} />);
    const button = getByRole('link');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
