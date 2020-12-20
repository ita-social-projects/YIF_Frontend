import React from 'react';
import AdvantagesBlock from '.';
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
  const { getByText } = render(
    <AdvantagesBlock title='Розвивайся' url='assets/images/aboutUs3.svg' />
  );
  expect(getByText(/Розвивайся/i)).toBeInTheDocument();
  const title = screen.getByText(/Розвивайся/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/H3/i);
});

test('render an IMG from props', () => {
  const { getByText } = render(
    <AdvantagesBlock title='Розвивайся' url='assets/images/aboutUs3.svg' />
  );
  expect(getByText(/Розвивайся/i)).toBeInTheDocument();
  const img = screen.getByAltText(/Розвивайся/i);
  expect(img).toBeInTheDocument();
  expect(img.tagName).toMatch(/IMG/i);
  expect(img).toHaveAttribute('src', 'assets/images/aboutUs3.svg');
});
