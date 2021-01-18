import React from 'react';
import { render, fireEvent } from '@testing-library/react';

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
      <>
        <form
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
            handleSubmit(e, '')
          }
        >
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
      </>
    );
  };

  it('shoud login user', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<TestComponent onClick={handleClick()} />);
    const emailInput = getByTestId('email') as HTMLInputElement;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    const loginButton = getByTestId('login') as HTMLInputElement;
    const logoutButton = getByTestId('logout') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    expect(emailInput.value).toEqual('test@mail.com');
    fireEvent.change(passwordInput, { target: { value: '*Qwerty123' } });
    expect(passwordInput.value).toEqual('*Qwerty123');
    fireEvent.change(passwordInput, { target: { value: '*Qwerty123' } });
    expect(passwordInput.value).toEqual('*Qwerty123');
    fireEvent.click(logoutButton);
    expect(handleClick).toHaveBeenCalled();
  });
});
