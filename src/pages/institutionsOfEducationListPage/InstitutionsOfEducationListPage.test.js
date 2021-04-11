import React from 'react';
import ReactDOM from 'react-dom';
import InstitutionsOfEducationListPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import {
  cleanup,
  act,
  fireEvent,
  queryAllByTestId,
  queryByTestId,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { authContext } from '../../services/tokenValidator';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(cleanup);

const data = {
  currentPage: 3,
  totalPages: 3,
  responseList: [
    {
      isFavorite: false,
      id: 'sdsfsf',
      abbreviation: 'abbreviation1',
      site: 'site1',
      address: 'address1',
      description: 'description1',
      startOfCampaign: 'startOfCampaign1',
      endOfCampaign: 'endOfCampaign1',
    },
    {
      isFavorite: false,
      id: 'dfijfjenvnciebv',
      abbreviation: 'abbreviation2',
      site: 'site2',
      address: 'address2',
      description:
        'description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2description2 description2',
      startOfCampaign: 'startOfCampaign2',
      endOfCampaign: 'endOfCampaign2',
    },
    {
      isFavorite: false,
      id: 'fsdfsdfsdf',
      abbreviation: 'abbreviation3',
      site: 'site3',
      address: 'address3',
      description: 'description3',
      startOfCampaign: 'startOfCampaign3',
      endOfCampaign: 'endOfCampaign3',
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
            <InstitutionsOfEducationListPage />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const cards = queryAllByTestId(container, 'card');
  expect(cards).toHaveLength(3);

  const heading = queryByTestId(container, 'heading');
  expect(heading.innerHTML).toBe('Заклади освіти');

  const pageButtons = queryAllByTestId(container, 'currentPage');
  fireEvent.click(pageButtons[2]);
  const prevButton = queryByTestId(container, 'prevPage');
  fireEvent.click(prevButton);
  const nextButton = queryByTestId(container, 'nextPage');
  fireEvent.click(nextButton);
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
      <Provider store={store}>
        <Router history={history}>
          <authContext.Provider
            value={{
              token: '',
              refreshToken: 'Token',
              isExpired: false,
              isRefreshing: false,
              getToken: () => {},
              updateToken: () => {},
              removeToken: () => {},
            }}
          >
            <InstitutionsOfEducationListPage />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const placeholder = queryByTestId(container, 'placeholder');
  expect(placeholder).toBeInTheDocument();
});

it('history', async () => {
  const history = createMemoryHistory();
  const state = { id: 'directionId' };
  history.push('/', state);
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
            <InstitutionsOfEducationListPage />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });
});

it('check pagination with total pages = 1', async () => {
  const history = createMemoryHistory();
  const dataPagination = {
    currentPage: 1,
    totalPages: 1,
    responseList: [
      {
        isFavorite: false,
        id: 'sdsfsf',
        abbreviation: 'abbreviation1',
        site: 'site1',
        address: 'address1',
        description: 'description1',
        startOfCampaign: 'startOfCampaign1',
        endOfCampaign: 'endOfCampaign1',
      },
    ],
  };
  const mockJsonPromisePagination = Promise.resolve(dataPagination);

  const mockFetchPromisePagination = Promise.resolve({
    json: () => mockJsonPromisePagination,
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromisePagination);

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
            <InstitutionsOfEducationListPage />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const prevButton = queryByTestId(container, 'prevPage');
  fireEvent.click(prevButton);
  const nextButton = queryByTestId(container, 'nextPage');
  fireEvent.click(nextButton);
  const pageButton = queryByTestId(container, 'currentPage');
  fireEvent.click(pageButton);
});

it('click on the star adding to favorites', async () => {
  const history = createMemoryHistory();
  const currentToken = 'Token';

  const dataPagination = {
    currentPage: 1,
    totalPages: 1,
    responseList: [
      {
        isFavorite: false,
        id: 'sdsfsf',
        abbreviation: 'abbreviation1',
        site: 'site1',
        address: 'address1',
        description: 'description1',
        startOfCampaign: 'startOfCampaign1',
        endOfCampaign: 'endOfCampaign1',
      },
    ],
  };

  const mockJsonPromiseStar = Promise.resolve(dataPagination);

  const mockFetchPromiseStar = Promise.resolve({
    json: () => mockJsonPromiseStar,
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseStar);

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
              getToken: () => {
                return currentToken;
              },
              updateToken: () => {},
              removeToken: () => {},
            }}
          >
            <InstitutionsOfEducationListPage />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const star = queryByTestId(container, 'star');
  fireEvent.click(star);
});

it('click on the star deleting from favorites', async () => {
  const history = createMemoryHistory();
  const currentToken = 'Token';

  const dataPagination = {
    currentPage: 1,
    totalPages: 1,
    responseList: [
      {
        isFavorite: true,
        id: 'sdsfsf',
        abbreviation: 'abbreviation1',
        site: 'site1',
        address: 'address1',
        description: 'description1',
        startOfCampaign: 'startOfCampaign1',
        endOfCampaign: 'endOfCampaign1',
      },
    ],
  };
  const mockJsonPromiseStarDel = Promise.resolve(dataPagination);

  const mockFetchPromiseStarDel = Promise.resolve({
    json: () => mockJsonPromiseStarDel,
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseStarDel);

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
              getToken: () => {
                return currentToken;
              },
              updateToken: () => {},
              removeToken: () => {},
            }}
          >
            <InstitutionsOfEducationListPage />
          </authContext.Provider>
        </Router>
      </Provider>,
      container
    );
  });

  const star = queryByTestId(container, 'star');
  fireEvent.click(star);
});
