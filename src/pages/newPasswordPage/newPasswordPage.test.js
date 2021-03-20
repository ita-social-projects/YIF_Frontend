import React from 'react';
import NewPasswordPage from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <NewPasswordPage />
      </Provider>
    </MemoryRouter>,
    div
  );
});
