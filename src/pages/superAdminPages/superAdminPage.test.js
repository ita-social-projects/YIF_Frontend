import React from 'react';
import SuperAdmin from './index';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('SuperAdmin', () => {
  test('render correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <SuperAdmin />
        </Provider>
      </Router>
    );
    const navItem = document.querySelector('.admins');
    userEvent.click(navItem);
    expect(screen.getByText('Закладів освіти')).toBeInTheDocument();
  });
});
