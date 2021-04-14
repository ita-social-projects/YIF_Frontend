import React from 'react';
import { act, render } from '@testing-library/react';
import InstitutionOfEducationPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';

const data = [
  {
    liked: true,
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

test('check success response', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <Router>
          <InstitutionOfEducationPage />
        </Router>
      </Provider>
    );
  });

  expect(fetch).toBeCalledTimes(2);
});
