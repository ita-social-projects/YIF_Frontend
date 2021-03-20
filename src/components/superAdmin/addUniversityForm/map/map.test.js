import React from 'react';
import ReactDOM from 'react-dom';
import UniversityMap from './index.tsx';

jest.mock('leaflet');

describe('Test Leaflet methods', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UniversityMap />, div);
    // expect('leaflet');
  });
});
