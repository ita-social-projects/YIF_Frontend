import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import InstitutionsOfEducationMap from './index';

// it('renders without crashing', () => {
//   const mockJsonPromise = Promise.resolve({
//     message: 'message',
//   });

//   const mockFetchPromise = Promise.resolve({
//     json: () => mockJsonPromise,
//     status: 404,
//   });
//   global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
//   render(<InstitutionOfEducationMap data={institutionsOfEducationDB} />);
// });

describe('Test Leaflet methods', () => {
  it('should render map with empty data0', async () => {
    const institutionsOfEducationDB = [{}];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <InstitutionsOfEducationMap data={institutionsOfEducationDB} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render map with 1 marker', async () => {
    const institutionsOfEducationDB = [
      {
        key: '1',
        id: '1',
        name: 'name',
        site: 'site',
        lat: 49,
        lon: 29,
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <InstitutionsOfEducationMap data={institutionsOfEducationDB} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render map with 2 markers', async () => {
    const institutionsOfEducationDB = [
      {
        key: '2',
        id: '2',
        name: 'name',
        site: 'site',
        lat: 49,
        lon: 29,
      },
      {
        key: '3',
        id: '3',
        name: 'name',
        site: 'site',
        lat: 49,
        lon: 29,
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <InstitutionsOfEducationMap data={institutionsOfEducationDB} />
        </MemoryRouter>
      </Provider>
    );
  });
});
