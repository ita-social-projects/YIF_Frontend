import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewPasswordForm from './index';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

let container = null;
beforeEach(() => {
  // window.grecaptcha = {
  //   ready: jest.fn().mockImplementation((cb) => cb()),
  //   execute: jest.fn().mockImplementation(() => Promise.resolve('qwerty')),
  // };
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  delete window.grecaptcha;
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('NewPasswordForm', () => {
  it('input get corect values', async () => {
    act(() => {
      render(
        <Router>
          <NewPasswordForm />
        </Router>,
        container
      );
    });
    await wait(() => {
      userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(
        screen.getByPlaceholderText('Підтвердіть пароль'),
        'Qwerty1@'
      );
    });
    expect(screen.getByPlaceholderText('Пароль')).toHaveValue('Qwerty1@');
    expect(screen.getByPlaceholderText('Підтвердіть пароль')).toHaveValue(
      'Qwerty1@'
    );
  });

  it('error message when input have incorect values', async () => {
    act(() => {
      render(
        <Router>
          <NewPasswordForm />
        </Router>,
        container
      );
    });
    await wait(() => {
      userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1#');
      userEvent.type(
        screen.getByPlaceholderText('Підтвердіть пароль'),
        'Qwerty1@'
      );
      userEvent.click(screen.getByRole('button'));
    });
    expect(screen.getByText('Паролі мають співпадати')).toBeInTheDocument();
  });

  it('success message when password changed', async (done) => {
    act(() => {
      render(
        <Router>
          <NewPasswordForm />
        </Router>,
        container
      );
    });
    await wait(() => {
      userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(
        screen.getByPlaceholderText('Підтвердіть пароль'),
        'Qwerty1@'
      );
      userEvent.click(screen.getByRole('button'));
      done();
    });
    await wait(() => {
      expect(
        screen.getByText(
          'Ваш пароль змінено! Ви можете увійти за допомогою нового паролю!'
        )
      ).toBeInTheDocument();
    });
  });

  it('error when reject', async (done) => {
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    act(() => {
      render(
        <Router>
          <NewPasswordForm />
        </Router>,
        container
      );
    });
    await wait(() => {
      userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(
        screen.getByPlaceholderText('Підтвердіть пароль'),
        'Qwerty1@'
      );
      userEvent.click(screen.getByRole('button'));
      done();
    });
    await wait(() => {
      expect(
        screen.getByText('Щось пішло не такб спробуйте знову!')
      ).toBeInTheDocument();
    });
  });
});
