import React from 'react';
import RegistrationForm from './registrationForm'
import {MemoryRouter} from 'react-router-dom';
import {fireEvent, render, screen, wait} from "@testing-library/react";


describe('registrationForm', () => {

  test('render a title', () => {
    const {getByText} = render(
        <MemoryRouter>
          <RegistrationForm/>
        </MemoryRouter>
    );
    const text = screen.getByText(/зареєстровані/i)
    expect(text).toBeInTheDocument();
    expect(text.tagName).toMatch(/P/i);

  });

  test('checking placeholderText', () => {
    const {getByText} = render(
        <MemoryRouter>
          < RegistrationForm/>
        </MemoryRouter>
    );
    const inputEmail = screen.getByPlaceholderText('Електронна пошта');
    const inputPassword = screen.getByPlaceholderText('Пароль');
    const inputConfirmPassword = screen.getByPlaceholderText('Підтвердіть пароль');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputConfirmPassword).toBeInTheDocument();

  });

  test('checking to render img', () => {
    const {getByText} = render(
        <MemoryRouter>
          < RegistrationForm/>
        </MemoryRouter>
    );
    const img = screen.getByAltText('win');
    expect(img).toBeInTheDocument();

  });

  test('checking to render wrapper', () => {
    const {getByText} = render(
        <MemoryRouter>
          < RegistrationForm/>
        </MemoryRouter>
    );
    const section = screen.getByRole('section');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toMatch(/SECTION/i);
    const wrapper = screen.getByRole('wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.tagName).toMatch(/DIV/i);
  });

  test('renders with blank fields', () => {
    const { container } = render(
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
    );

    const passwordNode = container.querySelector('input[name="password"]');
    const confirmPasswordNode = container.querySelector('input[name="confirmPassword"]');
    const emailNode = container.querySelector('input[name="email"]');

    expect(passwordNode.tagName).toBe('INPUT');
    expect(confirmPasswordNode.tagName).toBe('INPUT');
    expect(emailNode.tagName).toBe('INPUT');

    expect(passwordNode.getAttribute('value')).toBe('');
    expect(confirmPasswordNode.getAttribute('value')).toBe('');
    expect(emailNode.getAttribute('value')).toBe('');

  });

  test('Clicking the submit correct values after entering', async () => {
    const { container } = render(
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
    );

    const passwordNode = container.querySelector('input[name="password"]');
    const confirmPasswordNode = container.querySelector('input[name="confirmPassword"]');
    const emailNode = container.querySelector('input[name="email"]');


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

  });


});

