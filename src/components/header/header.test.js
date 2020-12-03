import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '.';

test('should ', () => {
  const header = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(header).toMatchSnapshot();
});
