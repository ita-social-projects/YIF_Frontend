import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import App from './index';

test('fake test', () => {
  expect(true).toBeTruthy();
});

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/Toolkit/i)).toBeInTheDocument();
});
