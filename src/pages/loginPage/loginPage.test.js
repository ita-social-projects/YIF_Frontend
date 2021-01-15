import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </MemoryRouter>,
    div
  );
});
