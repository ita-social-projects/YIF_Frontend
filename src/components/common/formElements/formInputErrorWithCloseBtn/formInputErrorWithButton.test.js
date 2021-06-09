import React from 'react';
import FormInputErrorWithCloseBtn from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('render a errorMessage from props', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <FormInputErrorWithCloseBtn
      errorType='input'
      errorMessage='Something goes wrong...'
      errorButtonHandler={handleClick}
    />
  );
  expect(getByText(/Something goes wrong.../i)).toBeInTheDocument();
  const title = screen.getByText(/Something goes wrong.../i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/p/i);

  const closeBtn = screen.getByText(/Закрити/i);
  fireEvent.click(closeBtn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('render a errorMessage from props type form', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <FormInputErrorWithCloseBtn
      errorType='form'
      errorMessage='Something goes wrong...'
      errorButtonHandler={handleClick}
    />
  );
  expect(getByText(/Something goes wrong.../i)).toBeInTheDocument();
  const title = screen.getByText(/Something goes wrong.../i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/p/i);

  const closeBtn = screen.getByText(/Закрити/i);
  fireEvent.click(closeBtn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('render a errorMessage from props type form', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <FormInputErrorWithCloseBtn
      errorType='incorrect errorType'
      errorMessage='Something goes wrong...'
      errorButtonHandler={handleClick}
    />
  );
  expect(getByText(/Something goes wrong.../i)).toBeInTheDocument();
  const title = screen.getByText(/Something goes wrong.../i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/p/i);

  const closeBtn = screen.getByText(/Закрити/i);
  fireEvent.click(closeBtn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
