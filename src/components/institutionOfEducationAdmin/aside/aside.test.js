import React from 'react';
import Aside from '.';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const links = (
  <div>
    <a href='#'>Link1</a>
    <a href='#'>Link2</a>
    <a href='#'>Link3</a>
  </div>
);

it('renders without crashing', () => {
  render(
    <Router>
      <Aside>{links}</Aside>
    </Router>
  );
  expect(screen.getAllByRole('link')).toHaveLength(3);
});
