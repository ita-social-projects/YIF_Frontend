import React from 'react';
import AccordionItem from './index';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const header = <h1>Header</h1>;
const body = <p>You never know what tomorrow will bring</p>;

describe('Accordion', () => {
  test('render and work', () => {
    render(
      <Router>
        <AccordionItem headerContent={header} bodyContent={body} />
      </Router>
    );
    const accHeader = document.querySelector('.acc_item__line');
    expect(screen.getByText('\u002B')).toBeInTheDocument();
    userEvent.click(accHeader);
    expect(screen.getByText('\u2212')).toBeInTheDocument();
  });
});
