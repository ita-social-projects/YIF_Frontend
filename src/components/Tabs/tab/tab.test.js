import React from 'react';
import Tab from './Tab';
import { render, screen } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Tab', () => {
  test('render and work', () => {
    let tab = {
      children: 'Текст вкладки',
    };

    let { children } = tab;
    render(<Tab children={children} />);
    expect(screen.getByText('Текст вкладки')).toBeInTheDocument();
  });
});
