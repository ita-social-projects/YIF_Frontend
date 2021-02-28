import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import SuperAdminPanel from './adminPanel';

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

it('check SuperAdminPanel as a whole component', () => {
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <SuperAdminPanel />
      </MemoryRouter>,
      container
    );
  });

  let links = container.querySelectorAll('a');

  expect(links).toHaveLength(4);

  // check links
  expect(links[0].innerHTML).toBe('Університетів');
  expect(links[1].innerHTML).toBe('Шкіл');
  expect(links[2].innerHTML).toBe('Університети');
  expect(links[3].innerHTML).toBe('Школи');
});
