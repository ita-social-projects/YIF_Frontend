import React from 'react';
import ImagePickerField from './ImagePickerField';
import { fireEvent, render, screen, act } from '@testing-library/react';

describe('Test ImagePicker', () => {
  it('should render component with default picture', async () => {
    render(<ImagePickerField />);
    // screen.debug();
  });

  it('should render component with setted picture', async () => {
    const picture = `\[]-[]/`;
    React.useState = jest.fn().mockReturnValue([picture, {}]);

    render(<ImagePickerField />);
  });

  it('should click picture', async () => {
    const setPicture = jest.fn();
    const imageHandler = jest.fn((picture) => setPicture(picture));
    const picture = `\[]-[]/`;
    React.useState = jest.fn().mockReturnValue([picture, {}]);

    const { getByTestId } = render(
      <ImagePickerField imageHandler={imageHandler} />
    );

    act(() => {
      fireEvent.click(getByTestId('picture'));
    });

    // expect(setPicture).toHaveBeenCalledTimes(1);
  });
});
