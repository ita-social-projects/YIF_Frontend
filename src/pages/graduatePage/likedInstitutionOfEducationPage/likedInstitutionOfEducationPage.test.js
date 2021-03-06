import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import InstitutionOfEducationList from '.';
import { Provider } from 'react-redux';
import { store } from '../../../store/store.ts';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { setRoleReducer } from '../../../store/reducers/setRoleReducer';

const mock = require('../../../services/tokenValidator');

mock.useAuth = jest.fn(() => {
  return {
    token: 'token',
    getToken: jest.fn(() => '123'),
  };
});

store.dispatch(setRoleReducer('Graduate'));

afterEach(() => {
  jest.clearAllMocks();
});

const data = [
  {
    isFavorite: true,
    id: 'sdsfsf',
    abbreviation: 'abbreviation1',
    site: 'site1',
    address: 'address1',
    description:
      'long description1 long description1 long description1 long description1 long description1 long description1long description1 long description1 long description1 long description1 long description1 long description1long description1long description1 long description1',
    startOfCampaign: 'startOfCampaign1',
    endOfCampaign: 'endOfCampaign1',
  },
];

const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('InstitutionOfEducationList', () => {
  test('check success response', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionOfEducationList />
          </Router>
        </Provider>
      );
    });

    const titles = document.querySelectorAll('h2');
    expect(titles).toHaveLength(1);
  });

  test('check error ', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => mockJsonPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionOfEducationList />
          </Router>
        </Provider>
      );
    });

    const titles = document.querySelectorAll('h3');
    expect(titles).toHaveLength(1);
  });

  test('click on the star deleting from favorites', async () => {
    const mockJsonPromiseStarError = Promise.resolve(data);
    const mockFetchPromiseStarError = Promise.resolve({
      json: () => mockJsonPromiseStarError,
      status: 200,
    });
    global.fetch = jest
      .fn()
      .mockImplementation(() => mockFetchPromiseStarError);

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionOfEducationList />
          </Router>
        </Provider>
      );
    });

    const star = screen.getByTestId('star');

    await act(async () => {
      fireEvent.click(star);
    });

    expect(fetch).toBeCalledTimes(3);
  });

  test('click on the star with bad response ', async () => {
    render(
      <Provider store={store}>
        <Router>
          <InstitutionOfEducationList />
        </Router>
      </Provider>
    );
    await act(async () => {});
    const star = screen.getAllByTestId('star');
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => 'bad news',
        status: 404,
      })
    );
    await act(async () => {
      fireEvent.click(star[0]);
    });
    const placeholder = screen.getByTestId('placeholder');
    expect(fetch).toBeCalledTimes(3);
    expect(placeholder).toBeInTheDocument();
  });

  test('click on the star with no response', async () => {
    render(
      <Provider store={store}>
        <Router>
          <InstitutionOfEducationList />
        </Router>
      </Provider>
    );
    await act(async () => {});
    const star = screen.getAllByTestId('star');
    global.fetch.mockImplementationOnce(() =>
      Promise.reject({
        json: () => 'bad news',
        status: 404,
      })
    );
    await act(async () => {
      fireEvent.click(star[0]);
    });
    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });
});
