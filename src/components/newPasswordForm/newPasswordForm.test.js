import React from 'react';
import NewPasswordForm from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../services/useCaptcha', () => ({
  _esModule: true,
  useCaptcha: jest.fn().mockImplementation(() => ({
    getCaptchaToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('qwertty')),
  })),
}));

const mockJsonPromise = Promise.resolve('Пароль змінено!');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

jest.useFakeTimers();

describe('NewPasswordForm', () => {
  test('render component correctly', () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    expect(getByText('Введіть ваш новий пароль!')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(getByRole('link')).toBeVisible();
  });

  test('inputs get correct values', async () => {
    const { getByPlaceholderText } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(getByPlaceholderText('Підтвердіть пароль'), 'Qwerty1@');
    });
    expect(getByPlaceholderText('Пароль')).toHaveValue('Qwerty1@');
    expect(getByPlaceholderText('Підтвердіть пароль')).toHaveValue('Qwerty1@');
  });

  test('shows an input error message', async () => {
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(getByPlaceholderText('Підтвердіть пароль'), 'Qwerty1№');
      userEvent.click(getByRole('button'));
    });
    expect(queryByText('Паролі мають співпадати')).toBeInTheDocument();
  });

  test('shows a notification of a successful password change', async () => {
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(getByPlaceholderText('Підтвердіть пароль'), 'Qwerty1@');
      userEvent.click(getByRole('button'));
    });
    expect(
      queryByText(
        'Ваш пароль змінено! Ви можете увійти за допомогою нового паролю!'
      )
    ).toBeInTheDocument();
  });

  test('shows an error message when something went wrong', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Some error'));
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(getByPlaceholderText('Підтвердіть пароль'), 'Qwerty1@');
      userEvent.click(getByRole('button'));
    });
    expect(
      queryByText('Щось пішло не так, спробуйте знову!')
    ).toBeInTheDocument();
  });

  test('the error message disappears after two seconds', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Some error'));
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(getByPlaceholderText('Підтвердіть пароль'), 'Qwerty1@');
      userEvent.click(getByRole('button'));
    });
    expect(
      queryByText('Щось пішло не так, спробуйте знову!')
    ).toBeInTheDocument();
    act(() => {
      jest.runAllTimers();
    });
    expect(
      queryByText('Щось пішло не так, спробуйте знову!')
    ).not.toBeInTheDocument();
  });
});
