import React from 'react';
import EditInstitutionOfEducationInfoPage from '../editInstitutionOfEducationInfo/index';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('editInstitutionOfEducationInfo', () => {
  test('render component with values', () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfoPage />
      </Router>
    );
    expect(screen.getByLabelText('Абревіатура:')).toHaveValue();
    expect(screen.getByLabelText('Сайт:')).toHaveValue();
  });

  test('render map', () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfoPage />
      </Router>
    );
    expect(screen.getByText('Leaflet')).toBeInTheDocument();
  });
});
