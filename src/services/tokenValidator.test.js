import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { AuthProvider, useAuth } from './tokenValidator';

const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg';

const testRefreshToken = 'sgXpmfYg7IB15/dFq6fwbqWeM1AV6QDMLGdZm7er8mg=';

describe('token validator', () => {
  const TestComponent = () => {
    const {
      token,
      getToken,
      isExpired,
      user,
      updateToken,
      removeToken,
    } = useAuth();

    // const testToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg';

    return (
      <div>
        <button data-testid='get-token' onClick={getToken}>
          click
        </button>
        <button
          data-testid='update-token'
          onClick={() => updateToken(testToken, testRefreshToken)}
        >
          click
        </button>
        <button data-testid='remove-token' onClick={removeToken}>
          click
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

  test('should fetch successfully', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => response,
      })
    );

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = getByTestId('get-token');
    fireEvent.click(button);

    await wait(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'https://yifbackend.tk/api/Authentication/RefreshToken',
        {
          body: '{"token":null,"refreshToken":null}',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      )
    );
  });

  test('should fetch unsuccessfully', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => badResponse,
      })
    );

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = getByTestId('get-token');
    fireEvent.click(button);

    await wait(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'https://yifbackend.tk/api/Authentication/RefreshToken',
        {
          body: '{"token":null,"refreshToken":null}',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      )
    );
  });

  test('should update token', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = getByTestId('update-token');
    fireEvent.click(button);

    expect(window.onstorage).toBeTruthy();
  });

  test('should remove token', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const button = getByTestId('remove-token');
    fireEvent.click(button);

    expect(window.onstorage).toBeTruthy();
  });
});
