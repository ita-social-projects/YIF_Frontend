import React from 'react';
import NewPasswordForm from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, act } from '@testing-library/react';
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

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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

  test('redirects to the page after a successful password change ', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <NewPasswordForm />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(getByPlaceholderText('Підтвердіть пароль'), 'Qwerty1@');
      userEvent.click(getByRole('button'));
    });
    jest.runAllTimers();
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
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

  test('error message disappears after 2 sec', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Some error'));
    const { getByPlaceholderText, getByRole, queryByText, getByText } = render(
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
      getByText('Щось пішло не так, спробуйте знову!')
    ).toBeInTheDocument();
    act(() => {
      //  The code on the line below gives a warning: Can't perform a React state update on an unmounted component.
      jest.runAllTimers();
    });
    expect(
      queryByText('Щось пішло не так, спробуйте знову!')
    ).not.toBeInTheDocument();
  });
});
