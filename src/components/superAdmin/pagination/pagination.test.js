import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pagination from '.';

describe('Pagination', () => {
  test('render corectly', () => {
    render(
      <Router>
        <Pagination />
      </Router>
    );
    const buttons = document.querySelectorAll('.paginationItem');
    expect(buttons).toHaveLength(5);
  });
});
