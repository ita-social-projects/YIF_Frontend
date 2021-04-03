import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useResetPassword from './useResetPassword';
import { APIUrl } from './endpoints';

jest.mock('../services/useCaptcha.tsx', () => ({
  _esModule: true,
  useCaptcha: jest.fn().mockImplementation(() => ({
    getCaptchaToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('qwertty')),
  })),
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
const mockFetchPromiseBad = Promise.resolve({
  json: () => mockJsonPromise,
  status: 400,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

jest.useFakeTimers();

describe('USE RESET PASSWORD', () => {
  const TestComponent = () => {
    const { handleChangeEmail, handleSubmit, email, error } = useResetPassword(
      `${APIUrl}Users/ResetPassword`
    );
    return (
      <>
        <form onSubmit={(e) => handleSubmit(e, '/')}>
          <input
            type='text'
            data-testid='email'
            onChange={handleChangeEmail}
            value={email}
          ></input>
          <button type='submit' data-testid='login'>
            Reset Password
          </button>
          {error.hasError && (
            <p data-testid='errorMessage'>{`Status code: ${error.errorStatusCode}; Error msg: ${error.errorMessage}`}</p>
          )}
        </form>
      </>
    );
  };

  test('should change email', async () => {
    const { getByTestId } = render(
      <Router>
        <TestComponent />
      </Router>
    );

    const emailInput = getByTestId('email');

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    expect(emailInput.value).toEqual('test@mail.com');
  });

  test('redirect after success submiting', async () => {
    render(
      <Router>
        <TestComponent />
      </Router>
    );
    await wait(() => {
      userEvent.type(screen.getByTestId('email'), 'test@mail.com');
      userEvent.click(screen.getByRole('button'));
    });
    jest.runAllTimers();
    expect(mockHistoryPush).toBeCalledTimes(1);
  });

  test('shows error message', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Some error'));
    render(
      <Router>
        <TestComponent />
      </Router>
    );
    await wait(() => {
      userEvent.type(screen.getByTestId('email'), 'test@mail.com');
      userEvent.click(screen.getByRole('button'));
    });
    expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
  });

  test('shows error message from server', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseBad);
    render(
      <Router>
        <TestComponent />
      </Router>
    );
    await wait(() => {
      userEvent.type(screen.getByTestId('email'), 'test@mail.com');
      userEvent.click(screen.getByRole('button'));
    });
    expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
  });
});
