import React from 'react';
import FormCloseButton from '.';
import ReactDOM from 'react-dom';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <FormCloseButton />
    </MemoryRouter>,
    div
  );
});

test('check the link', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <FormCloseButton />
    </MemoryRouter>
  );
  const link = screen.getByRole(/link/i);
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/');
});
