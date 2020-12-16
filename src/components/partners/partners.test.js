import React from 'react';
import {Partners} from "../index";
import { render, fireEvent, screen} from "@testing-library/react";


test('render a title', () => {
  const {getByText} = render(<Partners />);
  expect(getByText(/Наші партнери/i)).toBeInTheDocument();
  const buttonRight = screen.getByTestId('buttonRight');
  const buttonLeft = screen.getByTestId('buttonLeft');
  expect(buttonLeft).toBeInTheDocument();
  expect(buttonRight).toBeInTheDocument();
});

test('check if user can scroll the slide', () => {
  const {getByText} = render(<Partners />);
  const onClick = jest.fn();
  const buttonRight = screen.getByTestId('buttonRight');
  const buttonLeft = screen.getByTestId('buttonLeft');
  render(<Partners onClick={onClick()} />);
  fireEvent.click(buttonRight);
  fireEvent.click(buttonLeft);
  expect(onClick).toHaveBeenCalledTimes(1);
});
