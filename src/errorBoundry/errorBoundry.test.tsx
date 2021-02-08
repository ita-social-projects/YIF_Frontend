import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { store } from '../store/store';
import ErrorBoundry from './index';

class TestPage extends Component {
  render() {
    return <h1>Test page</h1>;
  }
}

describe('ERROR BOUNDARY', () => {
  test('should render ErrorBoundry component without throwing an error ', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ErrorBoundry>
          <TestPage />
        </ErrorBoundry>
      </Provider>
    );
    const testPage = getByText(/Test page/i);
    expect(testPage).toBeInTheDocument();
  });
});
