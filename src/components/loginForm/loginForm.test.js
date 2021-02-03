import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, wait } from '@testing-library/react';
import LoginForm from '.';
import { MemoryRouter } from 'react-router-dom';

const div = document.createElement('div');
const container = document.createElement('div');
div.append(container);

it('submits correct values', async () => {
  ReactDOM.render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
    container
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
