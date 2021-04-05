import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import {
  cleanup,
  act,
  render,
  fireEvent,
  queryAllByTestId,
  queryByTestId,
} from '@testing-library/react';
import InstitutionOfEducationPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

// let container = null;
// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(cleanup);

const data = [
  {
    isFavorite: true,
    specialties: [
      {
        id: 'id1',
        code: 'code1',
        name: 'name1',
      },
      {
        id: 'id2',
        code: 'code2',
        name: 'name2',
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
    render(
      <Router history={history}>
        <Provider store={store}>
          <InstitutionOfEducationPage />
        </Provider>
      </Router>
    );
  });
});
