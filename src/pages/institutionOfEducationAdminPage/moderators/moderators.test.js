import React from 'react';
import Moderators from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Moderators Page', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Moderators />
      </Router>
    );
    expect(screen.getByText('Модератори')).toBeInTheDocument();
  });

  test('input email', async () => {
    render(
      <Router>
        <Moderators />
      </Router>
    );
    const input = document.querySelector('input');
    await wait(() => {
      userEvent.type(input, '123');
    });
    expect(input).toHaveValue('123');
  });

  test('blocking works', async () => {
    render(
      <Router>
        <Moderators />
      </Router>
    );
    const icon = document.querySelector('.unlock');
    await wait(() => {
      userEvent.click(icon);
    });
    expect(icon).not.toBeInTheDocument();
  });

  test('deleting works', async () => {
    render(
      <Router>
        <Moderators />
      </Router>
    );
    const icon = document.querySelector('.delete');
    expect(screen.getAllByText(/\b(\w*moderator\w*)\b/g)).toHaveLength(5);
    await wait(() => {
      userEvent.click(icon);
    });
    expect(screen.getAllByText(/\b(\w*moderator\w*)\b/g)).toHaveLength(4);
  });
});
