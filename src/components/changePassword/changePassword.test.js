import React from 'react';
import ChangePassword from './index';
import userEvent from '@testing-library/user-event';
import { render, wait } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

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

  test('inputs get correct values', () => {
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

    expect(getByPlaceholderText('Новий пароль')).toHaveValue('Qwerty-1');
    expect(getByPlaceholderText('Підтвердіть новий пароль')).toHaveValue(
      'Qwerty-1'
    );
  });

  test('shows an input error message', async () => {
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );
    await wait(() => {
      userEvent.type(getByPlaceholderText('Старий пароль'), 'QWerty-1');
      userEvent.type(getByPlaceholderText('Новий пароль'), 'Qwerty-1');
      userEvent.type(
        getByPlaceholderText('Підтвердіть новий пароль'),
        'Qwerty-!'
      );
      userEvent.click(getByRole('button'));
    });

    expect(queryByText('Паролі мають співпадати')).toBeInTheDocument();
  });
});
