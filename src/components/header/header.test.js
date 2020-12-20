import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '.';

describe('header', () => {
  let header;
  const links = [
    { text: 'Напрями', location: '/directions' },
    { text: 'Університети', location: '/universities' },
    { text: 'Вхід', location: '/login' },
    { text: 'Реєстрація', location: '/register' },
  ];

  beforeEach(() => {
    header = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test.each(links)('should have %s link', (link) => {
    //ensure the text is in the dom, will throw error if can't find
    const linkDom = screen.getByText(link.text);

    expect(linkDom).toHaveAttribute('href', link.location);
  });

  test('should have logo that links to home page', () => {
    const logoDom = screen.getByTestId(/logo/i);

    //check the link location
    expect(logoDom).toHaveAttribute('href', '/');

    //check the logo text
    expect(logoDom.textContent).toBe('YIF');
  });

  test('should match snapshot', () => {
    expect(header).toMatchSnapshot();
  });
});
