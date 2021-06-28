import React from 'react';
import Administrator from './index';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../../../services/tokenValidator.tsx', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => 'token'),
      };
    },
  };
});

describe('Administrator Info', () => {
  test('can get data from server and render it', async () => {

    const mockJsonPromise = Promise.resolve({
      name: 'Admin',
      email: 'admin@mail.com'
    });
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    afterEach(() => {
      jest.clearAllMocks();
    });

    await act(async () => {
      render(
        <Router>
          <Administrator />
        </Router>
      );
    });
    expect(screen.getByTestId('administrator')).toBeInTheDocument();
    expect(fetch).toBeCalledTimes(1);
  });

  test('error while getting data from server', async () => {

    const mockJsonPromise = Promise.resolve({
      name: 'Admin',
      email: 'admin@mail.com'
    });
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 400,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    afterEach(() => {
      jest.clearAllMocks();
    });

    await act(async () => {
      render(
        <Router>
          <Administrator />
        </Router>
      );
    });
    expect(screen.getByText('Щось пішло не так, спробуйте знову.')).toBeInTheDocument();
    expect(fetch).toBeCalledTimes(1);
  });
});


