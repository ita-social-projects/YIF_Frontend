import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import LoginForm from '.';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
    div
  );
});

it('submits correct values', async () => {
  const { container } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');

  await wait(() => {
    fireEvent.change(email, {
      target: {
        value: 'mockemail',
      },
    });
  });

  await wait(() => {
    fireEvent.change(password, {
      target: {
        value: 'mockpassword',
      },
    });
  });
});

it('should show email input', () => {
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const input = getByPlaceholderText('Електронна пошта');
  expect(input).toBeInTheDocument();
  expect(input.tagName).toMatch(/input/i);
});

it('should show password input', () => {
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const input = getByPlaceholderText('Пароль');
  expect(input).toBeInTheDocument();
  expect(input.tagName).toMatch(/input/i);
});

test('should show submit button', () => {
  const { getByText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const button = getByText('Увійти');
  expect(button).toBeInTheDocument();
  expect(button.tagName).toMatch(/button/i);
});
