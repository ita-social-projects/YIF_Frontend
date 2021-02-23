import React from 'react';
import ReactDOM from 'react-dom';
import { queryAllByTestId, queryByTestId } from '@testing-library/react';
import DirectionsListPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';

it('check success render', () => {
  const container = document.createElement('container');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <DirectionsListPage />
      </Provider>
    </MemoryRouter>,
    container
  );

  const cards = queryAllByTestId(container, 'card');
  expect(cards).toHaveLength(5);

  const heading = queryByTestId(container, 'heading');
  expect(heading.innerHTML).toBe('Освітні напрямки');
});
