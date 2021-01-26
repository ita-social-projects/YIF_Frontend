import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import UserCabinet from './index';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Check graduateUserCabinet page', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <MemoryRouter>
          <UserCabinet />
        </MemoryRouter>
      </Provider>,
      container
    );
  });
});
