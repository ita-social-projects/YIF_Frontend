import React from 'react';
import ScrollToTopButton from './scrollToTopButton';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  render(<ScrollToTopButton />);
});

it('Add end removes eventListeners', async () => {
  window.scrollTo = jest.fn();

  const addEvLis = jest
    .spyOn(global, 'addEventListener')
    .mockImplementation(() => {});
  const removeEvLis = jest
    .spyOn(global, 'removeEventListener')
    .mockImplementation(() => {});

  const { getByRole } = render(<ScrollToTopButton />);
  const but = getByRole('button');

  fireEvent.scroll(but);
  fireEvent.click(but);
  fireEvent.scroll(but);

  wait(() => {
    expect(addEvLis).toHaveBeenCalled();
    expect(removeEvLis).toHaveBeenCalled();
  }, 0);
});

it('renders with visible button', () => {
  React.useState = jest.fn().mockReturnValue([true, {}]);
  const { getByRole } = render(<ScrollToTopButton />);

  expect(getByRole('button')).toBeInTheDocument();
});
