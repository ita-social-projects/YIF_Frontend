import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { queryAllByTestId, queryByTestId } from '@testing-library/react';
import InstitutionsOfEducationListPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

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

const data = {
  responseList: [
    {
      liked: false,
      id: 'sdsfsf',
      abbreviation: 'abbreviation1',
      site: 'site1',
      address: 'address1',
      description: 'description1',
      startOfCampaign: 'startOfCampaign1',
      endOfCampaign: 'endOfCampaign1',
    },
    {
      liked: false,
      id: 'dfijfjenvnciebv',
      abbreviation: 'abbreviation2',
      site: 'site2',
      address: 'address2',
      description: 'description2',
      startOfCampaign: 'startOfCampaign2',
      endOfCampaign: 'endOfCampaign2',
    },
  ],
};
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
          <InstitutionsOfEducationListPage />
        </Provider>
      </Router>,
      container
    );
  });

  const cards = queryAllByTestId(container, 'card');
  expect(cards).toHaveLength(2);

  const heading = queryByTestId(container, 'heading');
  expect(heading.innerHTML).toBe('Список закладів освіти');
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
          <InstitutionsOfEducationListPage />
        </Provider>
      </Router>,
      container
    );
  });

  const placeholder = queryByTestId(container, 'placeholder');
  expect(placeholder).toBeInTheDocument();
});
