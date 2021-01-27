import React from 'react';
import ResetPasswordForm from './index';
import { Router } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';

it('should check wrong writing email', async () => {
  const handleClick = jest.fn();
  const history = createMemoryHistory();

  const { container, getByText } = render(
    <Router history={history}>
      <ResetPasswordForm />
    </Router>
  );

  const emailInput = container.querySelector('input') as HTMLInputElement;
  const submitButton = getByText('Відновити');

  submitButton.onclick = handleClick;

  await wait(() => {
    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.click(submitButton);
  });

  await wait(() => {
    expect(emailInput.value).toEqual('test');
    expect(handleClick).toHaveBeenCalled();
    expect(getByText('Введіть дійсну електронну адресу')).toBeInTheDocument();
  });
});
