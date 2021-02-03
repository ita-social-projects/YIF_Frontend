import {fireEvent, render} from "@testing-library/react";
import React from 'react';
import Tooltips from './'


describe('tooltips', () => {

  it('render component', async () => {
    const handleClick = jest.fn();

    const { container } = render(
        <Tooltips onClick={handleClick()} additionalStyles={{}} />
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});