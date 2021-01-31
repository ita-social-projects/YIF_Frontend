import React from 'react';
import { PaginationPagesCreator } from './paginationPagesCreator';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

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

test('renders without crashing', () => {
  // ReactDOM.render(
  //   <PaginationPagesCreator totalPages={3} currentPage={1} />,
  //   container
  // );

  act(() => {
    ReactDOM.render(
      <PaginationPagesCreator totalPages={3} currentPage={1} />,
      container
    );
  });

  // let pagination = container.querySelector('.pages');
  // let pages = pagination.querySelectorAll('span');

  // expect(pages[0].textContent).toBe(1);
  // expect(pages[1].textContent).toBe(2);
  // expect(pages[2].textContent).toBe(3);
});
