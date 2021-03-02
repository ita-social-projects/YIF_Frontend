import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { queryAllByTestId, queryByTestId } from '@testing-library/react';
import DirectionsListPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const data = [
  {
    id: '21e63ba5-5dba-4719-bf9c-8ca48ad59050',
    name: 'Математика та статистика',
    code: '11',
    specialties: [
      {
        id: '6a4ef81e-4398-472d-85bf-0873d8f17c1f',
        name: 'Математика',
        code: '111',
        directionId: null,
        description: null,
        direction: null,
      },
      {
        id: 'bb6cfa4a-8ac1-4af6-9ed9-986873afc571',
        name: 'Статистика',
        code: '112',
        directionId: null,
        description: null,
        direction: null,
      },
      {
        id: 'f5109703-6bce-40ac-891d-39baaddbe06a',
        name: 'Прикладна математика',
        code: '113',
        directionId: null,
        description: null,
        direction: null,
      },
    ],
  },
];

const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

it('check success response', async () => {
  const history = createMemoryHistory();
  await act(async () => {
    ReactDOM.render(
      <Router history={history}>
        <Provider store={store}>
          <DirectionsListPage />
        </Provider>
      </Router>,
      container
    );
  });

  const cards = queryAllByTestId(container, 'card');
  expect(cards).toHaveLength(1);

  const heading = queryByTestId(container, 'heading');
  expect(heading.innerHTML).toBe('Освітні напрямки');
});

it('check error ', async () => {
  const mockFetchPromiseError = Promise.resolve({
    json: () => mockJsonPromise,
    status: 404,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

  const history = createMemoryHistory();
  await act(async () => {
    ReactDOM.render(
      <Router history={history}>
        <Provider store={store}>
          <DirectionsListPage />
        </Provider>
      </Router>,
      container
    );
  });

  const placeholder = queryByTestId(container, 'placeholder');
  expect(placeholder).toBeInTheDocument();
});
