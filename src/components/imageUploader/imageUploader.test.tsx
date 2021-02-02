import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageUploader from './index';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('IMAGE UPLOADER AVATAR', () => {
  it('should render component', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ImageUploader onClick={handleClick()} additionalStyles={{}} />
        </MemoryRouter>
      </Provider>
    );

    const div = container.querySelector('div')!;
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
