import React from 'react';
import ResetPasswordForm from './index';
import { Router } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';

it('should check input right wrote and go to login page', async () => {
  const handleClick = jest.fn();
  const history = createMemoryHistory();

  const { container } = render(
    <Router history={history}>
      <ResetPasswordForm />
    </Router>
  );

  const emailInput = container.querySelector('input') as HTMLInputElement;
  const linkToLogin = container.querySelector(
    '.formTextField__link'
  )! as HTMLLinkElement;

  linkToLogin.onclick = handleClick;

  await wait(() => {
    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.click(linkToLogin);
  });

  await wait(() => {
    expect(emailInput.value).toEqual('test@mail.com');
    expect(history.location.pathname).toEqual('/login');
  });
});
