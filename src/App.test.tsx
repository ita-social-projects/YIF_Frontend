import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { Counter } from './features/counter/Counter';

test('fake test', () => {
  expect(true).toBeTruthy();
});

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>);
    const linkElement = screen.getByText(/Toolkit/i);
    expect(linkElement).toBeInTheDocument();
});


