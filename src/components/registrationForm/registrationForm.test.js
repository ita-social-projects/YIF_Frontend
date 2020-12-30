import React from 'react';
import RegistrationForm from './registrationForm'
import {MemoryRouter} from 'react-router-dom';
import { render, screen} from "@testing-library/react";
import RegistrationPage from "./index";
import {unmountComponentAtNode} from "react-dom";


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

});

describe ('registrationPage', () => {

  test('checking to render wrapper', () => {

    let wrapper = null;
    beforeEach(() => {
      wrapper = document.createElement('section');
      document.body.appendChild(wrapper);
    });

    afterEach(() => {
      unmountComponentAtNode(wrapper);
      wrapper.remove();
      wrapper = null;
    });

  });

});
