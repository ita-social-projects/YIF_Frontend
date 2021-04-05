import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './index.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    </Provider>,
    div
  );
});
