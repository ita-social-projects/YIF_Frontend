import React, { Component } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { store } from '../store/store';
import requestStatusReducer, {
  requestStatusState,
  requestFailure,
} from '../store/reducers/requestStatus';
import ErrorBoundry from './index';
import { configureStore } from '@reduxjs/toolkit';

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

// const emptyObj: any = {};
// const store2 = configureStore({
//   reducer: {
//     requestStatus: requestStatusReducer,
//   },
// });

// const TestErrorPage = () => {
//   const dispatch = useDispatch();

//   return (
//     <span
//       onClick={() => {
//         dispatch(requestFailure());
//       }}
//       data-testid='errorButton'
//     >
//       Error Button
//     </span>
//   );
// };

// test('should catching an error ', () => {
//   const container = render(
//     <Provider store={store2}>
//       <ErrorBoundry>
//         <TestErrorPage />
//       </ErrorBoundry>
//     </Provider>
//   );
//   fireEvent.click(screen.getByText('Error Button'));
//   expect(store2.getState().requestStatus.error).toBeTruthy();
// });
