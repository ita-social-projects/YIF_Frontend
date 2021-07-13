import React from 'react';
import { ConfirmationBox } from './index';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

const propsToComponent = {
  question:
    'Ви справді бажаєте вилучити braveKnight@gmail.com з наявних модераторів ?',
  handleClick: jest.fn(),
};

describe('ConfirmationBox component', () => {
  test('renders correctly', () => {
    render(
      <ConfirmationBox
        question={propsToComponent.question}
        handleClick={propsToComponent.handleClick}
      />
    );

    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
  });

  test('call handleClick with true(accept)', () => {
    render(
      <ConfirmationBox
        question={propsToComponent.question}
        handleClick={propsToComponent.handleClick}
      />
    );

    userEvent.click(screen.getByTestId('accept'));

    expect(propsToComponent.handleClick).toHaveBeenCalledWith(true);
  });

  test('call handleClick with false(reject)', () => {
    render(
      <ConfirmationBox
        question={propsToComponent.question}
        handleClick={propsToComponent.handleClick}
      />
    );

    userEvent.click(screen.getByTestId('reject'));

    expect(propsToComponent.handleClick).toHaveBeenCalledWith(false);
  });
});
