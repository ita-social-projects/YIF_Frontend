import React from 'react';
import Administrators from './index';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Administrators Page', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Administrators />
      </Router>
    );
    expect(screen.getByText('Адміністратори')).toBeInTheDocument();
  });
});
