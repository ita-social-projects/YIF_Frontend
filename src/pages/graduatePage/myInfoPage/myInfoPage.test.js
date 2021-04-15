import React from 'react';
import MyInfo from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, act, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

describe('MyInfoPage', () => {
  test('render component correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <MyInfo />
        </Provider>
      </Router>
    );
    expect(screen.getByText('Мої дані')).toBeInTheDocument();
  });

  test('can enter new values', async () => {
    const mockJsonPromise = Promise.resolve(['1', '2', '3']);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    render(
      <Router>
        <Provider store={store}>
          <MyInfo />
        </Provider>
      </Router>
    );
    await wait(() => {
      userEvent.type(screen.getByTestId('lastName'), 'Smith');
      userEvent.selectOptions(screen.getByTestId('select'), '2');
    });
    expect(screen.getByTestId('lastName')).toHaveValue('Smith');
    expect(screen.getByTestId('select')).toHaveValue('2');
  });
});
