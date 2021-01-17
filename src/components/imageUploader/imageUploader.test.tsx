import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageUploader from './index';

describe('IMAGE UPLOADER AVATAR', () => {
  it('should render component', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ImageUploader onClick={handleClick()} additionalStyles={{}} />
    );

    const div = container.querySelector('div')!;
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
