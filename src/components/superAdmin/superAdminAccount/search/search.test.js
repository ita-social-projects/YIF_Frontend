import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from './search';

describe('check Search component', () => {
  it('renders correctly', () => {
    const { queryByRole } = render(<Search />);
    expect(queryByRole('textbox')).toBeTruthy();
  });

  it('updates on change', () => {
    const handlerSearch = jest.fn();
    render(<Search handlerSearch={handlerSearch} />);
    const searchBox = screen.queryByRole('textbox');

    fireEvent.change(searchBox, { target: { value: 'test' } });
    expect(searchBox.value).toBe('test');
  });

  it('check func handlerSearch', () => {
    const handlerSearch = jest.fn();

    render(<Search handlerSearch={handlerSearch} />);
    const searchBox = screen.queryByRole('textbox');

    fireEvent.change(searchBox, { target: { value: 'test' } });
    expect(searchBox.value).toBe('test');
    expect(handlerSearch).toBeCalledTimes(1);
  });

  it('check func clearInput', () => {
    const clearInput = jest.fn();

    const { rerender } = render(
      <Search clearInput={clearInput} searchValue={''} />
    );
    const closeBtn = screen.queryByAltText('close');
    rerender(<Search clearInput={clearInput} searchValue={'test'} />);
    fireEvent.click(closeBtn);

    expect(clearInput).toBeCalledTimes(1);
  });
});
