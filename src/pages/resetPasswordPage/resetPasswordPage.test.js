import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './index.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render, act } from '@testing-library/react';

it('renders without crashing', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResetPasswordPage />
        </MemoryRouter>
      </Provider>
    );
  });
});
