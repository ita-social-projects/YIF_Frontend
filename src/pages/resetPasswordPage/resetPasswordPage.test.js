import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './index.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render, screen } from '@testing-library/react';

it('renders without crashing', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Забули пароль?')).toBeInTheDocument();
});
