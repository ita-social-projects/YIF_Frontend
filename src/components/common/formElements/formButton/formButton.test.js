import React from 'react';
import FormButton from '.';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormButton />, div);
});

test('render a title from props', () => {
  const { getByText } = render(<FormButton title='Увійти' />);
  expect(getByText(/Увійти/i)).toBeInTheDocument();
  const title = screen.getByText(/Увійти/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/button/i);
});
