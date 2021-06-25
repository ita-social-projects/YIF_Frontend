import React from 'react';
import Administrator from './index';
import { act, render, screen } from '@testing-library/react';
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

describe('Administrator Info', () => {
  test('can get data from server and render it', async () => {
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
});
