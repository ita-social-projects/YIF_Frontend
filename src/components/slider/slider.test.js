import React from 'react';
import {Slider} from "../index";
import ReactDom from 'react-dom';
import { render, fireEvent, screen} from "@testing-library/react";


test('render a title', () => {
  const {getByText} = render(<Slider />);
  expect(getByText(/Our partners/i)).toBeInTheDocument();
  const buttonRight = screen.getByTestId('buttonRight');
  const buttonLeft = screen.getByTestId('buttonLeft');
  expect(buttonLeft).toBeInTheDocument();
  expect(buttonRight).toBeInTheDocument();
});

test('check if user can scroll the slide', () => {
  const {getByText} = render(<Slider />);
  const onClick = jest.fn();
  const buttonRight = screen.getByTestId('buttonRight');
  const buttonLeft = screen.getByTestId('buttonLeft');
  render(<Slider onClick={onClick()} />);
  fireEvent.click(buttonRight);
  fireEvent.click(buttonLeft);
  expect(onClick).toHaveBeenCalledTimes(1);
});

