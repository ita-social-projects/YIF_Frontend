import React from 'react';
import RegistrationForm from './registrationForm';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import ReactDOM from 'react-dom';

const div = document.createElement('div');
const container = document.createElement('div');
div.append(container);

it('renders with blank fields', () => {
  ReactDOM.render(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>,
    container
  );

  const passwordNode = container.querySelector('input[name="password"]');
  const confirmPasswordNode = container.querySelector(
    'input[name="confirmPassword"]'
  );
  const emailNode = container.querySelector('input[name="email"]');
  const checkboxNode = container.querySelector(
    'input[name="storeDataCheckbox"]'
  );

  expect(passwordNode.tagName).toBe('INPUT');
  expect(confirmPasswordNode.tagName).toBe('INPUT');
  expect(emailNode.tagName).toBe('INPUT');
  expect(checkboxNode.tagName).toBe('INPUT');

  expect(passwordNode.getAttribute('value')).toBe('');
  expect(confirmPasswordNode.getAttribute('value')).toBe('');
  expect(emailNode.getAttribute('value')).toBe('');
  expect(checkboxNode.checked).toEqual(false);
});

it('submit correct values', async () => {
  ReactDOM.render(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>,
    container
  );

  const passwordNode = container.querySelector('input[name="password"]');
  const confirmPasswordNode = container.querySelector(
    'input[name="confirmPassword"]'
  );
  const emailNode = container.querySelector('input[name="email"]');
  const checkboxNode = container.querySelector(
    'input[name="storeDataCheckbox"]'
  );

  await wait(() => {
    fireEvent.change(passwordNode, {
      target: {
        value: 'mockemail',
      },
    });
  });

  await wait(() => {
    fireEvent.change(confirmPasswordNode, {
      target: {
        value: 'mockemail',
      },
    });
  });
  await wait(() => {
    fireEvent.change(emailNode, {
      target: {
        value: 'mockemail',
      },
    });
  });

  fireEvent.click(checkboxNode);
  expect(checkboxNode.checked).toEqual(true);

  fireEvent.click(checkboxNode);
  expect(checkboxNode.checked).toEqual(false);

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
