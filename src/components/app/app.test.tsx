import React from 'react';
import { render } from '@testing-library/react';
import App from './index';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
it('should render App', () => {
  window.scrollTo = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
});
