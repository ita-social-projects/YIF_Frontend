import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '.';
import { AuthProvider } from '../../services/tokenValidator';

describe('header with no user', () => {
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

describe('header with logged in user', () => {
  let header;
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg'
  );

  beforeEach(() => {
    header = render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  test('should render properly', () => {
    expect(header).toMatchSnapshot();
  });

  test('should open dropdown content on click', () => {
    const avatar = screen.getByRole('img');

    act(() => {
      fireEvent.click(avatar);
    });
    expect(header).toMatchSnapshot();
  });

  test('should clear local storage on logout', () => {
    const avatar = screen.getByRole('img');

    act(() => {
      fireEvent.click(avatar);
    });

    const logout = screen.getByRole('button');

    act(() => {
      fireEvent.click(logout);
    });

    expect(localStorage.getItem('token')).toEqual(null);
  });
});
