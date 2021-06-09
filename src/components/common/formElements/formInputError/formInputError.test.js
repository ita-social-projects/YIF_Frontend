import React from 'react';
import FormInputError from '.';
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
describe('INPUT ERROR: ', () => {
  test('render a errorMessage from props', () => {
    const { getByText } = render(
      <FormInputError
        errorType='input'
        errorMessage='Something goes wrong...'
      />
    );
    expect(getByText(/Something goes wrong.../i)).toBeInTheDocument();
    const title = screen.getByText(/Something goes wrong.../i);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toMatch(/p/i);
  });

  test('render a errorMessage from props', () => {
    const { getByText } = render(
      <FormInputError
        errorType='form'
        errorMessage='Something goes wrong...'
        redirectLink='/'
      />
    );
    expect(getByText(/Something goes wrong.../i)).toBeInTheDocument();
    const title = screen.getByText(/Something goes wrong.../i);
    const link = screen.getByText('сюди');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toMatch(/p/i);
    expect(link).toBeInTheDocument();
  });
});
