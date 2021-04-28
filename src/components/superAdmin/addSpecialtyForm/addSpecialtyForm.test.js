import React from 'react';
import AddSpecialtyForm from './index';
import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent,
  render,
  wait,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { authContext } from '../../../services/tokenValidator';

describe('AddSpecialtyForm Test', () => {
  test('submit without errors and with redirect', async () => {
    const { getByRole, getByLabelText } = render(
      <Router>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddSpecialtyForm />
        </authContext.Provider>
      </Router>
    );

    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

  });
});