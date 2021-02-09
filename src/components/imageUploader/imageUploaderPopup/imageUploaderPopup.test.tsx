import React from 'react';
import { render, fireEvent, createEvent, wait } from '@testing-library/react';

import ImageUploaderPopup from './imageUploaderPopup';

let file: any;
beforeEach(() => {
  file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
});

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
  });

  it('shoud drop with error of type', async () => {
    const handleDrag = jest.fn();
    file = new File(['(⌐□_□)'], 'chucknorris.gif', { type: 'image/gif' });
    const { getByTestId, getByText } = render(
      <ImageUploaderPopup
        setPopupOpen={handleDrag}
        setSuccessLoad={handleDrag}
        setProfileImageSrc={handleDrag}
      />
    );
    await wait(() =>
      fireEvent.change(getByTestId('fileElem'), {
        target: { files: [file] },
      })
    );
    await wait(() => {
      const errorBtn = getByText(/закрити/i);
      expect(errorBtn).toBeInTheDocument();
    });
  });

  it('shoud drop with error of size', async () => {
    const handleDrag = jest.fn();
    let buffer = new ArrayBuffer(10485764);
    let view = new Uint32Array(buffer);
    file = new File([view], 'chucknorris.png', { type: 'image/png' });

    const { getByTestId, getByText } = render(
      <ImageUploaderPopup
        setPopupOpen={handleDrag}
        setSuccessLoad={handleDrag}
        setProfileImageSrc={handleDrag}
      />
    );
    await wait(() =>
      fireEvent.change(getByTestId('fileElem'), {
        target: { files: [file] },
      })
    );
    await wait(() => {
      const errorBtn = getByText(/закрити/i);
      expect(errorBtn).toBeInTheDocument();
    });
  });

  it('shoud drop with error of length', async () => {
    const handleDrag = jest.fn();
    file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    const { getByTestId, getByText } = render(
      <ImageUploaderPopup
        setPopupOpen={handleDrag}
        setSuccessLoad={handleDrag}
        setProfileImageSrc={handleDrag}
      />
    );
    await wait(() =>
      fireEvent.change(getByTestId('fileElem'), {
        target: { files: [file, file] },
      })
    );
    await wait(() => {
      const errorBtn = getByText(/закрити/i);
      expect(errorBtn).toBeInTheDocument();
    });
  });

  it('shoud change', async () => {
    const handleDrag = jest.fn();
    const { getByTestId } = render(
      <ImageUploaderPopup
        setPopupOpen={handleDrag}
        setSuccessLoad={handleDrag}
        setProfileImageSrc={handleDrag}
      />
    );
    await wait(() =>
      fireEvent.change(getByTestId('fileElem'), {
        target: { files: [file] },
      })
    );
    await wait(() => {});
  });

  it('shoud drop', async () => {
    const handleDrag = jest.fn();
    const { getByTestId } = render(
      <ImageUploaderPopup
        setPopupOpen={handleDrag}
        setSuccessLoad={handleDrag}
        setProfileImageSrc={handleDrag}
      />
    );

    const fileDropzone = getByTestId('fileElem')!;
    const fileDropEvent = createEvent.drop(fileDropzone);

    Object.defineProperty(fileDropEvent, 'dataTransfer', {
      value: {
        files: [file],
      },
    });
    await wait(() => {
      fireEvent(fileDropzone, fileDropEvent);
    });
    await wait(() => {});
  });
});
