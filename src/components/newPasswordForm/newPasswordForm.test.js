import React from 'react';
import NewPasswordForm from './index';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { screen, render, cleanup, wait } from '@testing-library/react';

afterEach(cleanup);

describe('NewPasswordForm', () => {
  const history = createMemoryHistory();
  it('render component', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router history={history}>
        <NewPasswordForm />
      </Router>
    );
    expect(getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(getByPlaceholderText('Підтвердіть пароль')).toBeInTheDocument();
    expect(getByRole('button')).toBeVisible();
  });

  it('can change focus with TAB', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router history={history}>
        <NewPasswordForm />
      </Router>
    );
    expect(document.body).toHaveFocus();
    userEvent.tab();
    userEvent.tab();
    expect(getByPlaceholderText('Пароль')).toHaveFocus();
    userEvent.tab();
    expect(getByPlaceholderText('Підтвердіть пароль')).toHaveFocus();
    userEvent.tab();
    expect(getByRole('button')).toHaveFocus();
  });

  it('input receives corect value', async () => {
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <NewPasswordForm />
      </Router>
    );
    userEvent.type(getByPlaceholderText('Пароль'), 'Qwerty1@');
    userEvent.type(
      screen.getByPlaceholderText('Підтвердіть пароль'),
      'Qwerty1@'
    );
    await wait(() => {
      expect(getByPlaceholderText('Пароль')).toHaveValue('Qwerty1@');
      expect(getByPlaceholderText('Підтвердіть пароль')).toHaveValue(
        'Qwerty1@'
      );
    });
  });
});
