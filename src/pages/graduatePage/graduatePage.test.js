import React from 'react';
import GraduateAccountPage from './index';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('GraduateAccountPage', () => {
  test('render component correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <GraduateAccountPage />
        </Provider>
      </Router>
    );
    expect(screen.getByText('Мої дані')).toBeInTheDocument();
  });
});
