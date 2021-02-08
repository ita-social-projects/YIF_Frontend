import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import useResetPassword from './useResetPassword';
import { APIUrl } from '../../src/services/endpoints';

const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('USE RESET PASSWORD', () => {
  const TestComponent: React.FC<any> = () => {
    const { handleChangeEmail, handleSubmit, email, error } = useResetPassword(
      `${APIUrl}Users/ResetPassword`
    );
    return (
      <>
        <form
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
            handleSubmit(e, '/')
          }
        >
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

  it('should change email', async () => {
    const history = createMemoryHistory();
    history.push('/');
    const { getByTestId } = render(
      <Router history={history}>
        <TestComponent />
      </Router>
    );

    const emailInput = getByTestId('email') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    expect(emailInput.value).toEqual('test@mail.com');
  });
});
