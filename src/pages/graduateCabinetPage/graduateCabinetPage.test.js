import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act, render } from '@testing-library/react';
import UserCabinet from './index';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { authContext } from '../../services/tokenValidator';

describe('Test Graduate Cabinet Page', () => {
  test('render with no data', async () => {
    const mockJsonPromise = Promise.resolve({
      message: 'message',
    });

    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
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
              <UserCabinet />
            </authContext.Provider>
          </MemoryRouter>
        </Provider>
      );
    });
  });

  test('render with data', async () => {
    const mockJsonPromise = Promise.resolve([
      {
        id: 'id',
        name: 'name',
        site: 'site',
        lat: 49,
        lon: 29,
      },
    ]);

    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
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
              <UserCabinet />
            </authContext.Provider>
          </MemoryRouter>
        </Provider>
      );
    });
  });
});
