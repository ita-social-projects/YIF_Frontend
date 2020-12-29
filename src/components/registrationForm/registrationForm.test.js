import React from 'react';
import RegistrationForm from './registrationForm'
import { MemoryRouter } from 'react-router-dom';
import {fireEvent, render, screen} from "@testing-library/react";

describe('registrationForm',() => {

  test('render a title', () => {
    const {getByText} = render(
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
    );
    const text = screen.getByText(/зареєстровані/i)
    expect(text).toBeInTheDocument();
    expect(text.tagName).toMatch(/P/i);

  });

  /*test('check the button', () => {
    const {getByText} = render(
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
    );
    const onClick = jest.fn();
    const button = screen.getByTestId('button');
    render(< RegistrationForm onClick={onClick()} />);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });*/

});
