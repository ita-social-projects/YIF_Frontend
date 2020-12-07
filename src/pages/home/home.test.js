import React from 'react';
import { render } from '@testing-library/react';
import Home from './home';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('should render correctly', () => {
  const home = render(
    <Provider store={store}>
      <Home />
    </Provider>

  );

  expect(home).toMatchSnapshot();
});
