import React from 'react';
import AddSpecialtyForm from './index';
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { authContext } from '../../../services/tokenValidator';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';

jest.setTimeout(15000);

const postPromiseOK = { message: 'Спеціальність успішно додано' };
const fetchPromiseToSetList = [
  {
    code: '15',
    id: '0673efc6-c6a4-4676-afd5-ed23a9d813d5',
    name: 'Автоматизація та приладобудування',
  },
  {
    code: '05',
    id: '0c591530-38d0-470f-9d30-24baab853b7b',
    name: 'Соціальні та поведінкові науки',
  },
  {
    code: '11',
    id: '21e63ba5-5dba-4719-bf9c-8ca48ad59050',
    name: 'Математика та статистика',
  },
  {
    code: '14',
    id: '6abcb97f-59b7-4b8c-a74c-8625529a9cd0',
    name: 'Електрична інженерія',
  },
  {
    code: '12',
    id: '7fa9ba66-076e-4cf5-9c1c-ca06d92b7f62',
    name: 'Інформаційні технології',
  },
];
const mockFetchPromiseToSetList = Promise.resolve({
  json: () => fetchPromiseToSetList,
  status: 200,
});
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

describe('AddSpecialtyForm Test', () => {
  jest.useFakeTimers();

  test('Download list of directions, render h1 ', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
    const { getByText } = render(
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Router>
    );

    await wait(() =>
      expect(getByText('Нова спеціальність')).toBeInTheDocument()
    );
    await wait(() =>
      expect(getByText('Автоматизація та приладобудування')).toBeInTheDocument()
    );
  });

  test('Front end form validation with no data input', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Router>
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    expect(getByText('Введіть код спеціальності')).toBeInTheDocument();
    expect(getByText('Введіть освітній напрямок')).toBeInTheDocument();
    expect(getByText('Напишіть опис спеціальності')).toBeInTheDocument();
  });

  test('Does redirect works?', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.selectOptions(getByLabelText('Напрям'), [
        'Автоматизація та приладобудування',
      ]);
      userEvent.type(getByLabelText('Код'), '300');
      userEvent.type(getByLabelText('Назва'), 'Тестова назва');
      userEvent.type(
        getByLabelText('Опис'),
        'Тестовий опис спеціальності. Мінімум 10 символів'
      );
    });
    global.fetch = jest.fn().mockImplementationOnce(() => mockPostPromiseOK);
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    await wait(() => {
      expect(getByText('Спеціальність успішно додано')).toBeInTheDocument();
      jest.runAllTimers();
      expect(mockHistoryPush).toBeCalledTimes(1);
    });
  });

  test('Show error message on get specialties function -> status: 404 || catch error', async () => {
    const mockGetPromiseBadRequest = Promise.reject({
      message: 'Не вдалося завантажити навчальні напрямки.',
    });
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockGetPromiseBadRequest);
    const { getByText } = render(
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => expect(getByText('Напрями відсутні')).toBeInTheDocument());
    await wait(() =>
      expect(
        getByText('Не вдалося завантажити навчальні напрямки.')
      ).toBeInTheDocument()
    );
  });

  test('Show error message on get specialties function -> status:500 || ISE', async () => {
    const getPromiseBadRequest = 'Internal Server Error';
    const mockGetPromiseBadRequest = Promise.resolve({
      json: () => getPromiseBadRequest,
      status: 500,
    });
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockGetPromiseBadRequest);
    const { getByText } = render(
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => expect(getByText('Напрями відсутні')).toBeInTheDocument());
    await wait(() =>
      expect(
        getByText('Виникла помилка у відображенні навчальних напрямків.')
      ).toBeInTheDocument()
    );
  });

  test('Show an error message in posting data when name and code exists in DB', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.selectOptions(getByLabelText('Напрям'), [
        'Автоматизація та приладобудування',
      ]);
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
      userEvent.type(
        getByLabelText('Опис'),
        'Тестовий опис спеціальності. Мінімум 10 символів'
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
      getByText('Такий код та назва спеціальності вже є у додатку')
    ).toBeInTheDocument();
  });

  test('Show an error message in posting data when name exists in DB', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.selectOptions(getByLabelText('Напрям'), [
        'Автоматизація та приладобудування',
      ]);
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
      userEvent.type(
        getByLabelText('Опис'),
        'Тестовий опис спеціальності. Мінімум 10 символів'
      );
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

    expect(
      getByText('Така назва спеціальності вже є у додатку')
    ).toBeInTheDocument();
  });

  test('Show an error message in posting data when code exists in DB', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.selectOptions(getByLabelText('Напрям'), [
        'Автоматизація та приладобудування',
      ]);
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
      userEvent.type(
        getByLabelText('Опис'),
        'Тестовий опис спеціальності. Мінімум 10 символів'
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

    expect(
      getByText('Такий код спеціальності вже є у додатку')
    ).toBeInTheDocument();
  });

  test('Show error message if caught exception', async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseToSetList);
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
          <AddSpecialtyForm />
        </authContext.Provider>
      </Provider>
    );
    await wait(() => {
      userEvent.selectOptions(getByLabelText('Напрям'), [
        'Автоматизація та приладобудування',
      ]);
      userEvent.type(getByLabelText('Код'), '126');
      userEvent.type(
        getByLabelText('Назва'),
        'Інформаційні системи та технології'
      );
      userEvent.type(
        getByLabelText('Опис'),
        'Тестовий опис спеціальності. Мінімум 10 символів'
      );
    });
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.reject('error'),
        status: 400,
      })
    );

    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

    expect(
      getByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });
});
