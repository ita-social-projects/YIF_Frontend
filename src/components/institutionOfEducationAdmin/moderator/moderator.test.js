import React from 'react';
import Moderator from './index';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const nonBlockedModerator = {
  email: 'moderator@gmail.com',
  isBlocked: 'False',
};
const blockedModerator = {
  email: 'braveKnight@gmail.com',
  isBlocked: 'True',
};

const deleteHandler = jest.fn();
const blockHandler = jest.fn();
afterEach(() => {
  jest.clearAllMocks();
});
describe('Moderator Page', () => {
  test('renders without crashing', () => {
    render(
      <Moderator
        email={nonBlockedModerator.email}
        isBlocked={nonBlockedModerator.isBlocked}
        deleteHandler={deleteHandler}
        blockHandler={blockHandler}
      />
    );
    expect(screen.getByText('moderator@gmail.com')).toBeInTheDocument();
  });

  test('call delete function', () => {
    render(
      <Moderator
        email={nonBlockedModerator.email}
        isBlocked={nonBlockedModerator.isBlocked}
        deleteHandler={deleteHandler}
        blockHandler={blockHandler}
      />
    );
    userEvent.click(screen.getByTestId('deleteSign'));
    expect(deleteHandler).toBeCalledTimes(1);
  });

  test('call block function', () => {
    render(
      <Moderator
        email={nonBlockedModerator.email}
        isBlocked={nonBlockedModerator.isBlocked}
        deleteHandler={deleteHandler}
        blockHandler={blockHandler}
      />
    );
    userEvent.click(screen.getByTestId('unlockSign'));
    expect(blockHandler).toBeCalledTimes(1);
  });

  test('call unblock function', () => {
    render(
      <Moderator
        email={blockedModerator.email}
        isBlocked={blockedModerator.isBlocked}
        deleteHandler={deleteHandler}
        blockHandler={blockHandler}
      />
    );
    userEvent.click(screen.getByTestId('lockSign'));
    expect(blockHandler).toBeCalledTimes(1);
  });
});
