import React from 'react';
import NewPasswordForm from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ReactDOM from 'react-dom';
import { fireEvent, wait, screen } from '@testing-library/react';

it('renders without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <NewPasswordForm />
      </Provider>
    </MemoryRouter>,
    container
  );
});

it('submits correct values', async () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <NewPasswordForm />
      </Provider>
    </MemoryRouter>,
    container
  );

  const password = container.querySelector('input[name="password"]');
  const confirmPassword = container.querySelector(
    'input[name="confirmPassword"]'
  );

  await wait(() => {
    fireEvent.change(password, {
      target: {
        value: 'password',
      },
    });
  });

  await wait(() => {
    fireEvent.change(confirmPassword, {
      target: {
        value: 'confirmPassword',
      },
    });
  });

  const handleClick = jest.fn();
  const submitButton = container.querySelector('button');

  submitButton.onclick = handleClick;

  await wait(() => {
    fireEvent.click(submitButton);
  });

  await wait(() => {
    expect(handleClick).toHaveBeenCalled();
  });
});
