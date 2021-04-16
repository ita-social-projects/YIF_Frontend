import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import UniversityListPage from '.';
import { store } from '../../../store/store';

describe('UniversityListPAge', () => {
  test('render correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <UniversityListPage />
        </Provider>
      </Router>
    );
    expect(screen.getAllByText('Університети')).toHaveLength(2);
  });
});
