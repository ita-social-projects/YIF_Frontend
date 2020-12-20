import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react'; // import react-testing methods

import ErrorPage from './index';

describe('ERROR PAGE', () => {
  test('render a block and check label', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(getByText(/Трясця/i)).toBeInTheDocument();
  });
  test('check the botton', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ErrorPage onClick={handleClick()} />
      </MemoryRouter>
    );
    const button = getByText(/головну/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
