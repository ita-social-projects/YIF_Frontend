import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  createEvent,
} from '@testing-library/react';
import ImageUploaderPopup from './imageUploaderPopup';

afterEach(() => cleanup());

describe('IMAGE UPLOADER POPUP', () => {
  it('should render component', () => {
    const handleDrag = jest.fn();

    const { container } = render(
      <ImageUploaderPopup
        setPopupOpen={handleDrag}
        setSuccessLoad={handleDrag}
        setProfileImageSrc={handleDrag}
      />
    );
    const divImageLoader = container.querySelector('input')!;
    expect(divImageLoader).toBeInTheDocument();

    const myEventDrag = createEvent.dragOver(divImageLoader, {
      dataTransfer: handleDrag(),
    });
    fireEvent(divImageLoader, myEventDrag);
    fireEvent.dragEnter(divImageLoader, { dataTransfer: handleDrag() });
    fireEvent.dragOver(divImageLoader, { dataTransfer: handleDrag() });
    fireEvent.dragLeave(divImageLoader, { dataTransfer: handleDrag() });

    expect(handleDrag).toBeCalled();

    const buttonUpload = container.querySelectorAll('.btn')!;
    expect(buttonUpload[0]).toBeInTheDocument();
    fireEvent.click(buttonUpload[0]);
    fireEvent.click(buttonUpload[1]);
    expect(handleDrag).toBeCalled();
  });
});
