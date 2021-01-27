import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react'; // import react-testing methods
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import ErrorPage from './index';

describe('ERROR PAGE', () => {
  test('render a block and check label', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      </Provider>
    );
    expect(getByText(/Трясця/i)).toBeInTheDocument();
  });
  test('check the botton', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorPage onClick={handleClick()} />
        </MemoryRouter>
      </Provider>
    );
    const button = getByText(/головну/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
