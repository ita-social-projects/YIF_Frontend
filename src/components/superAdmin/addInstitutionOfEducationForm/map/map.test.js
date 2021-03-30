import React from 'react';
import UniversityMap from './index.tsx';
import LocationMarker from './index.tsx';
import { fireEvent, render } from '@testing-library/react';
import { store } from '../../../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('Test Leaflet methods', () => {
  it('should render map', async () => {
    const handleClick = jest.fn();
    const setFieldValue = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <UniversityMap
            onClick={handleClick()}
            setFieldValue={setFieldValue}
          />
        </MemoryRouter>
      </Provider>
    );

    const map = container.querySelector('div');
    expect(map).toBeInTheDocument();
    fireEvent.click(map);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(setFieldValue).toHaveBeenCalledTimes(2);
  });

  it('should render marker', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LocationMarker onClick={handleClick()} />
        </MemoryRouter>
      </Provider>
    );

    const marker = container.querySelector('div');
    expect(marker).toBeInTheDocument();
    fireEvent.click(marker);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
