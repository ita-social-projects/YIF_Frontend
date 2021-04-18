import React from 'react';
import EditInstitutionOfEducationInfoPage from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const mockJsonPromise = Promise.resolve({});
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('editInstitutionOfEducationInfo', () => {
  test('render component with values', () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfoPage />
      </Router>
    );
  });

  test('render map', () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfoPage />
      </Router>
    );
  });
});
