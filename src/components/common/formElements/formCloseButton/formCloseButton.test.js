import React from 'react';
import FormCloseButton from '.';
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
