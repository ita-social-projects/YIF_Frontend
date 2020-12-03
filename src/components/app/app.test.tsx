import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import App from './index';

test('fake test', () => {
  expect(true).toBeTruthy();
});

test('renders without crashing', () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(app).toMatchSnapshot();
});
