import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import ReactDOM from 'react-dom';
import AddSpecialtyPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <AddSpecialtyPage />
      </Provider>
    </MemoryRouter>,
    div
  );
});
