import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import useRegistration from './useRegistration';

describe('USE REGISTRATION HOOK', () => {
  const TestComponent: React.FC<any> = () => {
    const APIUrl: string = 'https://test.com/api/Authentication/RegisterUser';
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
      <form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
          handleSubmit(e, '/cabinet');
        }}
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
        <input
          type='password'
          data-testid='confirmPassword'
          value={confirmPassword.confirmPassword}
          onChange={handleChangeConfirmPassword}
        ></input>
        <button type='submit' data-testid='login' id='login'>
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
    const emailInput = getByTestId('email') as HTMLInputElement;

    const passwordInput = getByTestId('password') as HTMLInputElement;
    const confirmPasswordInput = getByTestId(
      'confirmPassword'
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    expect(emailInput.value).toEqual('test@mail.com');

    fireEvent.change(passwordInput, { target: { value: '*Qwerty123' } });
    expect(passwordInput.value).toEqual('*Qwerty123');

    fireEvent.change(confirmPasswordInput, { target: { value: '*Qwerty123' } });
    expect(confirmPasswordInput.value).toEqual('*Qwerty123');
  });
});
