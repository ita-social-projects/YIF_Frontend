import React from 'react';
import FormTextField from '.';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

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

test('render a text from props', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FormTextField text='Ще не зареєстровані?' url='/login' />
    </MemoryRouter>
  );
  expect(getByText(/Ще не зареєстровані?/i)).toBeInTheDocument();
  const text = screen.getByText(/Ще не зареєстровані?/i);
  expect(text).toBeInTheDocument();
  expect(text.tagName).toMatch(/p/i);
});

test('check the link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FormTextField text='Ще не зареєстровані?' url='/login' />
    </MemoryRouter>
  );
  expect(getByText(/сюди/i)).toBeInTheDocument();
  const link = screen.getByText(/сюди/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toMatch(/a/i);
  expect(link).toHaveAttribute('href', '/login');
});
