import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import useLogin from './useLogin';

describe('USE LOGIN HOOK', () => {
  const TestComponent: React.FC<any> = () => {
    const APIUrl: string = 'https://yifbackend.tk/api/Authentication/LoginUser';
    const {
      handleChangeEmail,
      handleChangePassword,
      handleLogOut,
      handleSubmit,
      email,
      password,
      error,
    } = useLogin(APIUrl);
    return (
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          data-testid='email'
          onChange={handleChangeEmail}
          value={email.email}
        ></input>
        <input
          type='password'
          data-testid='password'
          onChange={handleChangePassword}
          value={password.password}
        ></input>
        <button type='submit' data-testid='login'>
          Login
        </button>
        <button type='button' onClick={handleLogOut} data-testid='logout'>
          Logout
        </button>
        {error.hasError && (
          <p data-testid='errorMessage'>{`Status code: ${error.errorStatusCode}; Error msg: ${error.errorMessage}`}</p>
        )}
      </form>
    );
  };

  it('shoud login user', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<TestComponent onClick={handleClick()} />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('login');
    const logoutButton = getByTestId('logout');

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });


    fireEvent.change(passwordInput, { target: { value: '*Qwerty123' } });
   wait (() =>expect(passwordInput.value).toEqual('*Qwerty123'));

    /*fireEvent.click(loginButton);
    wait (() =>expect(handleClick).toHaveBeenCalled());

    fireEvent.click(logoutButton);
    wait (() =>expect(handleClick).toHaveBeenCalled());
*/
  });
});
