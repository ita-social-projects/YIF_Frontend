import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SortingPanel from '.';

describe('SortingPanel', () => {
  test('render corectly', () => {
    render(
      <Router>
        <SortingPanel />
      </Router>
    );
    expect(screen.getByText('Сортувати:')).toBeInTheDocument();
  });
});
