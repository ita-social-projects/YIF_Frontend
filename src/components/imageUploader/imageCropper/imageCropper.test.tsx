import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageCropper from './imageCropper';

describe('IMAGE CROPPER', () => {
  it('should render component while loading', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ImageCropper
        loadedImage={{
          name: '',
          size: 0,
          type: '',
          data: '',
        }}
        setLoadedImage={handleClick}
        isLoading={true}
        setError={() => null}
        setCropper={() => null}
        aspectRatio={1}
        text={''}
      />
    );

    const img = container.querySelector('img')!;
    expect(img).toBeInTheDocument();
    fireEvent.click(img);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('should render component', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ImageCropper
        loadedImage={{
          name: '',
          size: 0,
          type: '',
          data: '',
        }}
        setLoadedImage={handleClick}
        isLoading={false}
        setError={() => null}
        setCropper={() => null}
        aspectRatio={1}
        text={''}
      />
    );

    const img = container.querySelector('img')!;
    expect(img).toBeInTheDocument();
    fireEvent.click(img);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
