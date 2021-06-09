import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Administrator from './index';

const administrator = {
  email: 'moderator@gmail.com'
};

describe('Administrator Page', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Administrator
          email={administrator.email}
        />
      </Router>
    );
    expect(screen.getByText('moderator@gmail.com')).toBeInTheDocument();
  });
});
