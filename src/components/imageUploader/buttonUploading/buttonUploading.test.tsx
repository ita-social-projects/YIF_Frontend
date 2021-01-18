import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ButtonUploading from './buttonUploading';

describe('IMAGE UPLOADER AVATAR', () => {
  afterEach(cleanup);

  it('should render component not transperent and not disabled', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ButtonUploading
        isDisabled={false}
        isTransperent={false}
        value={'Test'}
        handleClick={handleClick}
      />
    );

    const button = container.querySelector('a')!;
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('should render component transperent and disabled', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ButtonUploading
        isDisabled={true}
        isTransperent={true}
        value={'Test'}
        handleClick={handleClick()}
      />
    );

    const button = container.querySelector('a')!;
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
