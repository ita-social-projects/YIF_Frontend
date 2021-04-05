import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { Router } from 'react-router-dom';
import InstitutionOfEducationListOption from './index.tsx';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store.ts';
import {
  cleanup,
  act,
  fireEvent,
  queryAllByTestId,
  queryByTestId,
} from '@testing-library/react';
import { authContext } from '../../../../services/tokenValidator';
import { createMemoryHistory } from 'history';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(cleanup);

const data = [
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
    description:
      'Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2 Long description2',
    startOfCampaign: 'startOfCampaign2',
    endOfCampaign: 'endOfCampaign2',
  },
];

const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const history = createMemoryHistory();

it('check success response', async () => {
  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <authContext.Provider
            value={{
              token: 'testToken',
              refreshToken: 'Token',
              isExpired: false,
              isRefreshing: false,
              getToken: () => {},
              updateToken: () => {},
              removeToken: () => {},
            }}
          >
            <InstitutionOfEducationListOption />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const titles = container.querySelectorAll('h2');
  expect(titles).toHaveLength(2);
});

it('check error ', async () => {
  const mockFetchPromiseError = Promise.resolve({
    json: () => mockJsonPromise,
    status: 404,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <authContext.Provider
            value={{
              token: 'testToken',
              refreshToken: 'Token',
              isExpired: false,
              isRefreshing: false,
              getToken: () => {},
              updateToken: () => {},
              removeToken: () => {},
            }}
          >
            <InstitutionOfEducationListOption />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const titles = container.querySelectorAll('h3');
  console.log(titles[0].innerHTML);
  expect(titles).toHaveLength(1);
});
