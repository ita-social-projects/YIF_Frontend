import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import BannerLower from './index';

describe('HOME PAGE: lower banner', () => {
  test('render a block and check label', () => {
    const { getByText } = render(<BannerLower />);
    expect(getByText(/your it future/i)).toBeInTheDocument();
    const label = screen.getByText(/future/i);
    expect(label).toBeInTheDocument();
    expect(label.tagName).toMatch(/H1/i);
  });

  test('check the button', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<BannerLower onClick={handleClick()} />);
    const button = getByRole('link');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('check handle scroll', () => {
    const onScroll = jest.fn();
    render(<BannerLower onScroll={onScroll()} />);
    fireEvent.scroll(window, {
      target: { scrollY: document.body.offsetHeight },
    });
    expect(onScroll).toHaveBeenCalledTimes(1);
  });
});
