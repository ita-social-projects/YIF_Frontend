import React from 'react';
import ImagePickerField from './ImagePickerField';
import { fireEvent, render, screen } from '@testing-library/react';
import { store } from '../../../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('Test ImagePicker', () => {
  xit('should render component', async () => {
    const setFieldValue = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    const setPicture = jest.fn();

    useStateSpy.mockImplementationOnce((init) => ['init', setPicture]);

    const picture = 'dasdasda';

    const { getByTestId } = render(
      <ImagePickerField
        handleImage={() => console.log(`raz`)}
        setFieldValue={setFieldValue}
        setPicture={setPicture}
      />
    );

    const imageBox = getByTestId('ImageUploader');
    // expect(imageBox).toBeInTheDocument();

    // console.log(`imageBox`, imageBox);
    fireEvent.click(imageBox);
    // expect(handleClick).toHaveBeenCalledTimes(1);
    // expect(setPicture).toHaveBeenCalledTimes(1);
  });
});
