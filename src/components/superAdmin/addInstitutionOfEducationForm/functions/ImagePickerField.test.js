import React from 'react';
import ImagePickerField from './ImagePickerField';
import { fireEvent, render, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


describe('Test ImagePicker', () => {

  const picture = `\[]-[]/`;
  React.useState = jest.fn().mockReturnValue([picture, {}]);

  it('should render component with default picture', async () => {
    render(<ImagePickerField />);
    // screen.debug();
  });

  it('should render component with setted picture', async () => {
    const picture = `\[]-[]/`;
    React.useState = jest.fn().mockReturnValue([picture, {}]);
    render(<ImagePickerField />);
  });

  it('should click picture with university', async () => {
    const setPicture = jest.fn();
    const imageHandler = jest.fn((picture) => setPicture(picture));
    const { getByTestId } = render(
      <ImagePickerField imageHandler={imageHandler} text='university' />
    );

    act(() => {
      fireEvent.click(getByTestId('picture'));
    });

    // expect(setPicture).toHaveBeenCalledTimes(1);
  });
  it('should click picture with college', async () => {
    const setPicture = jest.fn();
    const imageHandler = jest.fn((picture) => setPicture(picture));
    const { getByTestId } = render(
      <ImagePickerField imageHandler={imageHandler} text='college' />
    );
    act(() => {
      fireEvent.click(getByTestId('picture'));
    });
  })
  it('should click picture without IOE type/default value', async () => {
    const setPicture = jest.fn();
    const imageHandler = jest.fn((picture) => setPicture(picture));
    const { getByTestId } = render(
      <ImagePickerField imageHandler={imageHandler} text='' />
    );
    await act(() => {
      fireEvent.click(getByTestId('picture'));
    })
  })
});
