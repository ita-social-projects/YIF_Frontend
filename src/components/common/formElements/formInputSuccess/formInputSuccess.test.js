import {render, screen} from "@testing-library/react";
import {FormInputSuccess} from './formInputSuccess'
import React from "react";

describe('registrationForm', () => {
test ('render wrapper successMessage', () => {
  const div = document.createElement('div')

  const { container } = render(<FormInputSuccess messageType='input' successMessage='Success...' />, {
    container: document.body.appendChild(div),
  })
});


test('render the successMessage', () => {
  const { getByText } = render(
      <FormInputSuccess messageType='input' successMessage='Success...' />
  );
  expect(getByText(/Success.../i)).toBeInTheDocument();
  const title = screen.getByText(/Success.../i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/p/i);
});
});
