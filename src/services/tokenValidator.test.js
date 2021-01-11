import React from 'react';
import { render, fireEvent, wait, act, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './tokenValidator';

const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg';

const testRefreshToken = 'sgXpmfYg7IB15/dFq6fwbqWeM1AV6QDMLGdZm7er8mg=';

describe('token validator', () => {
  const TestComponent = () => {
    const { token, getToken, updateToken, removeToken } = useAuth();

    return (
      <div>
        <button data-testid='get-token' onClick={getToken}>
          {String(token)}
        </button>
        <button
          data-testid='update-token'
          onClick={() => updateToken(testToken, testRefreshToken)}
        >
          {String(token)}
        </button>
        <button data-testid='remove-token' onClick={removeToken}>
          {String(token)}
        </button>
      </div>
    );
  };

  const response = {
    token: testToken,
    refreshToken: testRefreshToken,
  };
  const badResponse = {
    title: 'title',
  };

  test('should fetch successfully', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => response,
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = screen.getByTestId('get-token');
    fireEvent.click(button);
    wait(() => expect(button.textContent).toEqual(testToken));

    global.fetch.mockClear();
  }, 20000);

  test('should fetch with error', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => badResponse,
      })
    );
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = screen.getByTestId('get-token');
    fireEvent.click(button);

    await wait(() => expect(button.textContent).toEqual('null'));
    global.fetch.mockClear();
  });

  test('should update token', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = screen.getByTestId('update-token');
    fireEvent.click(button);

    wait(() =>
      expect(window.localStorage.token).toEqual(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg'
      )
    );
  });

  test('should remove token', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = screen.getByTestId('remove-token');
    fireEvent.click(button);

    wait(() => expect(window.localStorage.token).toBe(undefined));
  });
});
