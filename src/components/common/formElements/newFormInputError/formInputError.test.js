import React from 'react';
import FormInputError from './index';
import { render, screen } from '@testing-library/react';

describe('Testing FormInputError component', () => {
  test('Properly renders component for inputField', () => {
    render(
      <FormInputError
        errorFor='inputField'
        errorMessage='Something went wrong'
        redirectLink='/'
      />
    );
    expect(screen.getByText('Something went wrong'));
  });
  test('Properly renders component for form', () => {
    render(
      <FormInputError errorFor='form' errorMessage='Something went wrong' />
    );
    expect(screen.getByText('Something went wrong'));
  });
});
