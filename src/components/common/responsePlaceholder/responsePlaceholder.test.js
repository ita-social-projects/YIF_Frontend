import React from 'react';
import ResponsePlaceholder from '.';
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResponsePlaceholder errorMessage='error' />, div);
});

test('render an error text from props', () => {
  const { getByText } = render(<ResponsePlaceholder errorMessage='error' />);
  expect(getByText(/error/i)).toBeInTheDocument();
  const text = screen.getByText(/error/i);
  expect(text).toBeInTheDocument();
  expect(text.tagName).toMatch(/p/i);
});
