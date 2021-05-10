import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import Tabs from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <Tabs />
      </Provider>
    </MemoryRouter>,
    div
  );
});

xtest('check a toggle click', () => {
  const handleClick = jest.fn();
  const { getAllByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Tabs onClick={handleClick()} />
      </Provider>
    </MemoryRouter>
  );
  const button = getAllByTestId('toggle-btn')[0];
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});

xtest('check a toggle click', () => {
  const handleClick = jest.fn();
  const { getAllByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Tabs onClick={handleClick()} />
      </Provider>
    </MemoryRouter>
  );
  const button = getAllByTestId('toggle-btn')[1];
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});
