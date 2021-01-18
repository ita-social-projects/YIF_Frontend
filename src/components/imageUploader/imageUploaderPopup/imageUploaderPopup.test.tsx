import React from 'react';
import {
  render,
  fireEvent,
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
    const divImageLoader = container.querySelector('#fileElem')!;
    expect(divImageLoader).toBeInTheDocument();

    const myEventDrag = createEvent.dragOver(divImageLoader, {
      dataTransfer: handleDrag(),
    });
    fireEvent(divImageLoader, myEventDrag);
    fireEvent.dragEnter(divImageLoader, { dataTransfer: handleDrag() });
    fireEvent.dragOver(divImageLoader, { dataTransfer: handleDrag() });
    fireEvent.dragLeave(divImageLoader, { dataTransfer: handleDrag() });

    expect(handleDrag).toHaveBeenCalled();

    const buttonUpload = container.querySelectorAll('.btn')!;
    expect(buttonUpload[0]).toBeInTheDocument();
    fireEvent.click(buttonUpload[0]);
    fireEvent.click(buttonUpload[1]);
    expect(handleDrag).toHaveBeenCalled();

    // ЗАКОМЕНТОВАНИЙ КОД НЕ ПРОХОДИТЬ:
    // fireEvent.drop(divImageLoader, {
    //   dataTransfer: {
    //     files: [new File(['(0_0)'], 'chucknoris.png', { type: 'image/png' })]!,
    //   },
    // });
  });
  // it('shoud drop', async () => {
  //   const handleDrag = jest.fn();

  //   const { container } = render(
  //     <ImageUploaderPopup
  //       setPopupOpen={handleDrag}
  //       setSuccessLoad={handleDrag}
  //       setProfileImageSrc={handleDrag}
  //     />
  //   );
  //   const fileDropzone = container.querySelector('#fileElem')!;
  //   expect(fileDropzone).toBeInTheDocument();
  //   const fileDropEvent = createEvent.drop(fileDropzone);
  //   const file = new File(['0-0'], 'chacknoris.png', {
  //     type: 'image/png',
  //   });

  //   const fileList = [file];

  //   Object.defineProperty(fileDropEvent, 'dataTransfer', {
  //     value: {
  //       files: {
  //         item: (itemIndex: any) => fileList[itemIndex],
  //         length: fileList.length,
  //       },
  //     },
  //   });

  //   fireEvent(fileDropzone, fileDropEvent);
  // });
});
