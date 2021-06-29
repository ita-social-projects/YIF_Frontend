import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IoEadmin from '.';

describe('Pagination', () => {
  test('render corectly', () => {
    render(
      <Router>
        <IoEadmin />
      </Router>
    );
  });
});
