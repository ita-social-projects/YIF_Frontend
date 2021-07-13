import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import SuperAdminAccountPage from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';
import { authContext } from '../../../services/tokenValidator';

const institutionOfEducationAdmins = [
  {
    id: '1183f8eb-e8a1-4ad6-bbac-df64e685917d',
    user: {
      id: '272c95c1-7873-432e-a8ab-d8177ef27034',
      userName: 'NuweeAdmin',
      email: 'nuweeAdmin@gmail.com',
      phoneNumber: '+380-31-415-9265',
    },
    institutionOfEducation: {
      id: '96487fd4-72ea-4830-84cf-9e4d9bf8950f',
      name: 'Національний університет водного господарства та природокористування',
      abbreviation: 'НУВГП',
    },
    isBanned: true,
  },
];

afterEach(cleanup);

describe('check SuperAdminAccount component', () => {

  it('Check function fetchInstitutionOfEducationAdmins', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            responseList: institutionOfEducationAdmins,
          }),
      })
    );
    await wait(() => {
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
              <SuperAdminAccountPage />
            </authContext.Provider>
          </MemoryRouter>
        </Provider>
      );
    });

    global.fetch.mockRestore();
  });

  it('check error fetchInstitutionOfEducationAdmins ', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.reject({ responseList: institutionOfEducationAdmins }),
      })
    );
    await wait(() => {
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
              <SuperAdminAccountPage />
            </authContext.Provider>
          </MemoryRouter>
        </Provider>
      );
    });

    global.fetch.mockRestore();
  });
});
