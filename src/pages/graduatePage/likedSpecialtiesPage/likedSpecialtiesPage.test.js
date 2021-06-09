import React from 'react';
import LikedSpecialties from './index';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('GraduateAccountPage', () => {
  test('render component correctly', () => {
    render(
      <Router>
        <LikedSpecialties />
      </Router>
    );
    expect(screen.getByText('Список спеціальностей')).toBeInTheDocument();
  });
});
