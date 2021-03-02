import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { queryAllByTestId, queryByTestId } from '@testing-library/react';
import SpecialityPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
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
    code: '11',
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
            <SpecialityPage />
          </Provider>
        </Router>,
        container
      );
    });
  
  
  
  
  });

it('check success render', () => {
  const container = document.createElement('container');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <SpecialityPage />
      </Provider>
    </MemoryRouter>,
    container
  );

  const cards = queryAllByTestId(container, 'card');
  expect(cards).toHaveLength(3);

});
