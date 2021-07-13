import React from 'react';
import AddDirectionForm from './index';
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { authContext } from '../../../services/tokenValidator';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';

jest.setTimeout(15000);

const postPromiseOK = { message: 'Напрям успішно додано' };

const mockPostPromiseOK = Promise.resolve({
  json: () => postPromiseOK,
  status: 200,
});

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('AddDirectionForm Test', () => {
  jest.useFakeTimers();

  test('Form validation with no data input', async () => {
    const { getByText, getByRole } = render(
      <Router>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddDirectionForm />
        </authContext.Provider>
      </Router>
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    expect(getByText('Введіть код напряму')).toBeInTheDocument();
    expect(getByText('Введіть освітній напрямок')).toBeInTheDocument();
  });

  test('Does redirect works?', async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <Provider store={store}>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddDirectionForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.type(getByLabelText('Код'), '300');
      userEvent.type(getByLabelText('Назва'), 'Тестова назва');
    });
    global.fetch = jest.fn().mockImplementationOnce(() => mockPostPromiseOK);
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    await wait(() => {
      expect(getByText('Напрям успішно додано')).toBeInTheDocument();
      jest.runAllTimers();
      expect(mockHistoryPush).toBeCalledTimes(1);
    });
  });

  test('Show error message if name and code already exist', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Provider store={store}>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddDirectionForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
    });

    const postPromiseBadRequest = {
      errors: {
        Code: ['Such Code is exists in the database'],
        Name: ['Such Name is exists in the database'],
      },
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|961fb394-4faa4b922ca00653.',
    };

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => postPromiseBadRequest,
        status: 400,
      })
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

    expect(
      getByText('Такий код та напрям вже є у додатку')
    ).toBeInTheDocument();
  });

  test('Show error message if name already exists', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Provider store={store}>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddDirectionForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
      userEvent.type(getByLabelText('Код'), '129');
    });

    const postPromiseBadRequest = {
      errors: { Name: ['Such Name is exists in the database'] },
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|961fb394-4faa4b922ca00653.',
    };

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => postPromiseBadRequest,
        status: 400,
      })
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

    expect(getByText('Такий напрям вже є у додатку')).toBeInTheDocument();
  });

  test('Show error message if code already exists', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Provider store={store}>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddDirectionForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
    });

    const postPromiseBadRequest = {
      errors: { Code: ['Such Code is exists in the database'] },
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|961fb394-4faa4b922ca00653.',
    };

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => postPromiseBadRequest,
        status: 400,
      })
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

    expect(getByText('Такий код напряму вже є у додатку')).toBeInTheDocument();
  });

  test('Show error message if caught exception', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Provider store={store}>
        <authContext.Provider
          value={{
            token: 'testToken',
            refreshToken: 'Token',
            isExpired: false,
            isRefreshing: false,
            getToken: () => {},
            updateToken: () => {},
            removeToken: () => {},
          }}
        >
          <AddDirectionForm />
        </authContext.Provider>
      </Provider>
    );
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.reject('error'),
        status: 400,
      })
    );
    await wait(() => {
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
    });

    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

    expect(
      getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });
});
