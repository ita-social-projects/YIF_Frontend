import React from 'react';
import ReactDOM from 'react-dom';
import SuperAdminAccount from '.';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { MemoryRouter } from 'react-router-dom';

it('check success render', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <SuperAdminAccount />
      </Provider>
    </MemoryRouter>,
    div
  );
});
