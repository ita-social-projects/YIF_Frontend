import React from 'react';
import ChangePassword from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, fireEvent } from '@testing-library/react';
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
test('shows a notification of a successful password change', async () => {
  const { getByPlaceholderText, getByRole } = render(
    <AuthProvider>
      <ChangePassword />
    </AuthProvider>
  );

  userEvent.type(getByPlaceholderText('Старий пароль'), 'Qwerty1@');
  userEvent.type(getByPlaceholderText('Новий пароль'), 'Qwerty1@2');
  userEvent.type(getByPlaceholderText('Підтвердіть новий пароль'), 'Qwerty1@2');
  fireEvent.click(getByRole('button'));

  await wait(() => expect(global.fetch).toHaveBeenCalled());
});
