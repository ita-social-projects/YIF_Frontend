import React from 'react';
import FormTitle from '.';
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

test('render a title from props', () => {
  const { getByText } = render(<FormTitle title='Увійти' />);
  expect(getByText(/Увійти/i)).toBeInTheDocument();
  const title = screen.getByText(/Увійти/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h3/i);
});
