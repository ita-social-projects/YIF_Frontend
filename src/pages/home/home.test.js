import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '.';

test('fake test', () => {
  expect(2 + 2).toEqual(4);
});

test('renders without crashing', () => {
  const app = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(app).toMatchSnapshot();
});
