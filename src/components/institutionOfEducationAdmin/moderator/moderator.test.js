import React from 'react';
import Moderator from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const moderator = {
  email: 'moderator@gmail.com',
  isBlocked: false,
};

const deleteHandler = jest.fn();
const blockHandler = jest.fn();
describe('Moderator Page', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Moderator
          email={moderator.email}
          isBlocked={moderator.isBlocked}
          deleteHandler={deleteHandler}
          blockHandler={blockHandler}
        />
      </Router>
    );
    expect(screen.getByText('moderator@gmail.com')).toBeInTheDocument();
  });

  test('call delete function', async () => {
    render(
      <Router>
        <Moderator
          email={moderator.email}
          isBlocked={moderator.isBlocked}
          deleteHandler={deleteHandler}
          blockHandler={blockHandler}
        />
      </Router>
    );
    const icon = document.querySelector('.delete');
    await wait(() => {
      userEvent.click(icon);
    });
    expect(deleteHandler).toBeCalledTimes(1);
  });

  test('call block function', async () => {
    render(
      <Router>
        <Moderator
          email={moderator.email}
          isBlocked={moderator.isBlocked}
          deleteHandler={deleteHandler}
          blockHandler={blockHandler}
        />
      </Router>
    );
    const icon = document.querySelector('.unlock');
    await wait(() => {
      userEvent.click(icon);
    });
    expect(blockHandler).toBeCalledTimes(1);
  });
});
