import React from 'react';
import ChangePassword from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../services/tokenValidator';

jest.mock('../../services/useCaptcha.tsx', () => ({
  _esModule: true,
  useCaptcha: jest.fn().mockImplementation(() => ({
    getCaptchaToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('QWerty1@')),
  })),
}));

const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('ChangePassword', () => {
  test('render component correctly', () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );
    expect(getByText('Зміна пароля')).toBeInTheDocument();
    expect(getByPlaceholderText('Старий пароль')).toBeInTheDocument();
    expect(getByPlaceholderText('Новий пароль')).toBeInTheDocument();
    expect(
      getByPlaceholderText('Підтвердіть новий пароль')
    ).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('inputs get correct values', async () => {
    const { getByPlaceholderText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );

    userEvent.type(getByPlaceholderText('Новий пароль'), 'Qwerty-1');
    userEvent.type(
      getByPlaceholderText('Підтвердіть новий пароль'),
      'Qwerty-1'
    );

    await wait(() => {
      expect(getByPlaceholderText('Новий пароль')).toHaveValue('Qwerty-1');
      expect(getByPlaceholderText('Підтвердіть новий пароль')).toHaveValue(
        'Qwerty-1'
      );
    });
  });

  test('shows an input error message', async () => {
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );

    userEvent.type(getByPlaceholderText('Старий пароль'), 'QWerty-1');
    userEvent.type(getByPlaceholderText('Новий пароль'), 'Qwerty-1');
    userEvent.type(
      getByPlaceholderText('Підтвердіть новий пароль'),
      'Qwerty-!'
    );
    userEvent.click(getByRole('button'));

    await wait(() => {
      expect(queryByText('Паролі мають співпадати')).toBeInTheDocument();
    });
  });
  test('shows a notification of a successful password change', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <AuthProvider>
        <ChangePassword />
      </AuthProvider>
    );

    userEvent.type(getByPlaceholderText('Старий пароль'), 'Qwerty1@');
    userEvent.type(getByPlaceholderText('Новий пароль'), 'Qwerty1@2');
    userEvent.type(
      getByPlaceholderText('Підтвердіть новий пароль'),
      'Qwerty1@2'
    );
    fireEvent.click(getByRole('button'));
    await wait(() => expect(global.fetch).toHaveBeenCalled());
  });
});