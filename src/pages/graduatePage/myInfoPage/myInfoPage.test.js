import React from 'react';
import MyInfo from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, act, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

jest.mock('../../../services/tokenValidator', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => '123'),
      };
    },
  };
});

jest.mock('../../../components/imageUploader', () => ({ imageHandler }) => (
  <div
    data-testid='imageHandler'
    onClick={() => {
      imageHandler('foto');
    }}
  >
    foto
  </div>
));

beforeEach(() => {
  jest.clearAllMocks();
});

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

  test('can enter new values and send to server', async () => {
    await wait(() => {
      const mockJsonPromise = Promise.resolve(['1', '2', '3']);
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
        status: 200,
      });
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });
    render(
      <Router>
        <Provider store={store}>
          <MyInfo />
        </Provider>
      </Router>
    );
    const lastName = screen.getByTestId('lastName');
    const firstName = screen.getByTestId('firstName');
    const fathersName = screen.getByTestId('fathersName');
    const email = screen.getByTestId('email');
    const phone = screen.getByTestId('phone');
    const button = screen.getByRole('button');
    await wait(() => {
      userEvent.type(lastName, 'Smith');
      userEvent.type(firstName, 'John');
      userEvent.type(fathersName, 'Junior');
      userEvent.type(email, 'john@mail.com');
      userEvent.type(phone, '+380970707070');
      userEvent.selectOptions(screen.getByTestId('select'), '2');
      userEvent.click(button);
      userEvent.click(button);
    });

    expect(screen.getByTestId('lastName')).toHaveValue('Smith');
    expect(screen.getByTestId('select')).toHaveValue('2');
    expect(fathersName).toHaveValue('Junior');
    expect(fetch).toBeCalledTimes(2);
    expect(screen.getByText('Дані збережені')).toBeInTheDocument();
  });

  test('can enter new values and send to server(bad request)', async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });

    const button = screen.getByRole('button');

    await wait(() => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ message: false }),
          status: 400,
        })
      );
      userEvent.click(button);
      userEvent.click(button);
    });

    expect(fetch).toBeCalledTimes(2);
    expect(
      screen.getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });

  test('bad req from server(with message)', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'very bad news' }),
        status: 400,
      })
    );
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });

    expect(screen.getByText('very bad news')).toBeInTheDocument();
  });
  test('bad req from server(without message)', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: '' }),
        status: 400,
      })
    );
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });

    expect(
      screen.getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });

  test('when promise reject', async () => {
    await wait(() => {
      fetch.mockImplementationOnce(() => Promise.reject({}));
    });
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });

    expect(screen.getByTestId('select')).not.toHaveValue();
  });

  test('user can send his new foto to server', async () => {
    await wait(() => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(['1', '2', '3']),
          status: 200,
        })
      );
    });
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });
    await wait(() => {
      userEvent.selectOptions(screen.getByTestId('select'), '2');
    });
    const imageHandler = screen.getByTestId('imageHandler');
    await wait(() => {
      userEvent.click(imageHandler);
    });
    expect(fetch).toBeCalledTimes(2);
  });

  test('user can send his new foto to server(bad request with message)', async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });
    await wait(() => {
      userEvent.selectOptions(screen.getByTestId('select'), '2');
    });
    const imageHandler = screen.getByTestId('imageHandler');

    await wait(() => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ message: 'bad news' }),
          status: 400,
        })
      );
      userEvent.click(imageHandler);
    });
    expect(screen.getByText('bad news')).toBeInTheDocument();
    expect(fetch).toBeCalledTimes(2);
  });

  test('user can send his new foto to server(bad request without message)', async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });

    const imageHandler = screen.getByTestId('imageHandler');

    await wait(() => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ message: '' }),
          status: 400,
        })
      );
      userEvent.click(imageHandler);
    });
    expect(
      screen.getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });

  test('user can send his new foto to server(Promise reject)', async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <MyInfo />
          </Provider>
        </Router>
      );
    });

    const imageHandler = screen.getByTestId('imageHandler');

    await wait(() => {
      fetch.mockImplementationOnce(() => Promise.reject({}));
      userEvent.click(imageHandler);
    });
    expect(fetch).toBeCalledTimes(2);
  });
});
