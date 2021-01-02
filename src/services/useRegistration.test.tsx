import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import useRegistration from './useRegistration';

describe('USE REGISTRATION HOOK', () => {
  const TestComponent: React.FC<any> = () => {
    const APIUrl: string =
      'https://yifbackend.tk/api/Authentication/RegisterUser';
    const {
      handleChangeEmail,
      handleChangePassword,
      handleChangeConfirmPassword,
      handleSubmit,
      email,
      password,
      confirmPassword,
      error,
    } = useRegistration(APIUrl);
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
        <input
          type='password'
          data-testid='confirmPassword'
          value={confirmPassword.confirmPassword}
          onChange={handleChangeConfirmPassword}
        ></input>
        <button type='submit' data-testid='login'>
          Registration
        </button>
        {error.hasError && (
          <p data-testid='errorMessage'>{`Status code: ${error.errorStatusCode}; Error msg: ${error.errorMessage}`}</p>
        )}
      </form>
    );
  };

  it('shoud registr user', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<TestComponent onClick={handleClick()} />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');
    const loginButton = getByTestId('login');

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    expect(emailInput.value).toEqual('test@mail.com');

    fireEvent.change(passwordInput, { target: { value: '*Qwerty123' } });
    expect(passwordInput.value).toEqual('*Qwerty123');

    fireEvent.change(confirmPasswordInput, { target: { value: '*Qwerty123' } });
    expect(confirmPasswordInput.value).toEqual('*Qwerty123');

    fireEvent.click(loginButton);
    expect(handleClick).toHaveBeenCalled();
  });
});
