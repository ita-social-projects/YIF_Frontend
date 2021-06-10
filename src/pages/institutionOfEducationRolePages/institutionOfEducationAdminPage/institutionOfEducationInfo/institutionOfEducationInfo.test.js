import React from 'react';
import InstitutionOfEducationInfo from './index';
import { render, act, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../../services/tokenValidator.tsx', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => 'token'),
      };
    },
  };
});

const mockJsonPromise = Promise.resolve({
  name: 'University',
  abbreviation: 'UN',
  site: 'site.com',
  address: 'adress',
  phone: '+380970707007',
  email: 'univer@mail.com',
  description: 'The best!',
});
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

afterEach(() => {
  jest.clearAllMocks();
});

describe('InstitutionOfEducationInfo', () => {
  test('can get data from server and render it', async () => {
    await act(async () => {
      render(
        <Router>
          <InstitutionOfEducationInfo />
        </Router>
      );
    });
    expect(screen.getByText('The best!')).toBeInTheDocument();
    expect(fetch).toBeCalledTimes(1);
  });

  test('bad request from server', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'bad news' }),
        status: 400,
      })
    );
    await act(async () => {
      render(
        <Router>
          <InstitutionOfEducationInfo />
        </Router>
      );
    });
    expect(
      screen.getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
    expect(fetch).toBeCalledTimes(1);
  });

  test('get data (promise reject)', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    await act(async () => {
      render(
        <Router>
          <InstitutionOfEducationInfo />
        </Router>
      );
    });
    expect(
      screen.getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
    expect(fetch).toBeCalledTimes(1);
  });
});
