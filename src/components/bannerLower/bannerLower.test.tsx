import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import BannerLower from './index';
import { createMemoryHistory } from 'history';
import { authContext } from '../../services/tokenValidator';

describe('HOME PAGE: lower banner', () => {
  test('render a block and check label', () => {
    const { getByText } = render(
      <MemoryRouter>
        <BannerLower />
      </MemoryRouter>
    );
    expect(getByText(/your it future/i)).toBeInTheDocument();
    const label = screen.getByText(/future/i);
    expect(label).toBeInTheDocument();
    expect(label.tagName).toMatch(/H2/i);
  });

  test('check the button', () => {
    const history = createMemoryHistory();
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Router history={history}>
        <BannerLower onClick={handleClick()} />
      </Router>
    );
    const button = getByRole('link');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual('/register');
  });

  test('check handle scroll', () => {
    const onScroll = jest.fn();
    render(
      <MemoryRouter>
        <BannerLower onScroll={onScroll()} />
      </MemoryRouter>
    );
    fireEvent.scroll(window, {
      target: { scrollY: document.body.offsetHeight },
    });
    expect(onScroll).toHaveBeenCalledTimes(1);
  });

  test('check the button of logined', () => {
    const history = createMemoryHistory();
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Router history={history}>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <BannerLower onClick={handleClick()} />
        </authContext.Provider>
      </Router>
    );
    const button = getByRole('link');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual('/');
  });
});
