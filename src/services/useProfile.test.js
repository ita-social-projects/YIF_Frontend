import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import useProfile from './useProfile';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './tokenValidator';

describe('use profile hook', () => {
  const TestComponent = () => {
    const url = 'https://some-pseudo-url.com';
    const {
      handleFirstNameChange,
      handleLastNameChange,
      handleFathersNameChange,
      handlePhoneChange,
      handleEmailChange,
      handleSchoolChange,
      handleSubmit,
      name,
      surname,
      middleName,
      phoneNumber,
      email,
      schoolName,
      submitted,
      error,
      success,
    } = useProfile(url);

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleLastNameChange}
            value={surname}
            data-testid='surname'
          ></input>
          <input
            onChange={handleFirstNameChange}
            value={name}
            data-testid='name'
          ></input>
          <input
            onChange={handleFathersNameChange}
            value={middleName}
            data-testid='middle-name'
          ></input>
          <input
            onChange={handleEmailChange}
            value={email}
            data-testid='email'
          ></input>
          <input
            onChange={handlePhoneChange}
            value={phoneNumber}
            data-testid='phone'
          ></input>
          <input
            onChange={handleSchoolChange}
            value={schoolName}
            data-testid='school'
          ></input>
          <button onClick={handleSubmit} type='submit'>
            Submit
          </button>
        </form>
      </>
    );
  };

  const mockJsonPromise = Promise.resolve({
    surname: 'Torvalds',
    name: 'Linus',
    middleName: 'Benedict',
    email: 'linus@gmail.com',
    phoneNumber: '381111100111',
    schoolName: 'streets',
    photo: null,
  });
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  test('should fill form', () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const lastNameInput = screen.getByTestId('surname');
    const nameInput = screen.getByTestId('name');
    const fathersNameInput = screen.getByTestId('middle-name');
    const emailInput = screen.getByTestId('email');
    const phoneInput = screen.getByTestId('phone');
    const schoolInput = screen.getByTestId('school');

    fireEvent.change(lastNameInput, { target: { value: 'Torvalds' } });
    expect(lastNameInput.value).toEqual('Torvalds');

    fireEvent.change(nameInput, { target: { value: 'Linus' } });
    expect(nameInput.value).toEqual('Linus');

    fireEvent.change(fathersNameInput, { target: { value: 'Benedict' } });
    expect(fathersNameInput.value).toEqual('Benedict');

    fireEvent.change(emailInput, { target: { value: 'linus@gmail.com' } });
    expect(emailInput.value).toEqual('linus@gmail.com');

    fireEvent.change(phoneInput, { target: { value: '381111100111' } });
    expect(phoneInput.value).toEqual('381111100111');

    fireEvent.change(schoolInput, { target: { value: 'streets' } });
    expect(schoolInput.value).toEqual('streets');
  });

  test('should send form', async () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await wait(() => expect(global.fetch).toHaveBeenCalled());
  });
});
