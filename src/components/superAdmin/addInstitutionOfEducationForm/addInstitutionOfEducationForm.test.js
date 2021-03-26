import React from 'react';
import AddInstitutionOfEducationForm from './index';
import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent,
  render,
  wait,
  act,
  getByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { authContext } from '../../../services/tokenValidator';

const mockJsonPromise = Promise.resolve('Університет додано!');

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.useFakeTimers();

describe('AddIOEForm Test', () => {
  test('submit without errors and with redirect', async () => {
    const { getByRole, getByLabelText } = render(
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
          <AddInstitutionOfEducationForm />
        </authContext.Provider>
      </Router>
    );

    await wait(() => {
      userEvent.type(getByLabelText('Назва'), 'UniversityOfTheWorld');
      fireEvent.focusIn(getByLabelText('Назва'));
      fireEvent.focusOut(getByLabelText('Назва'));
      userEvent.selectOptions(getByLabelText('Тип закладу освіти'), [
        'university',
      ]);
      userEvent.type(getByLabelText('Аббревіатура'), 'UOTW');
      userEvent.type(getByLabelText('Адреса'), 'Address');
      userEvent.type(getByLabelText('Сайт'), 'http://site.com');
      userEvent.type(getByLabelText('Електронна адреса'), 'mail@mail.com');
      userEvent.type(getByLabelText('Телефон'), '+380999999999');
      userEvent.click(getByRole('presentation'));
      userEvent.type(
        getByLabelText('Опис'),
        'there should be at least fifty symbols there should be at least fifty symbols'
      );
      userEvent.type(
        getByLabelText('Введіть електронну адресу адміністратора'),
        'vadim.ilchenko@gmailaa.com'
      );
    });

    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });

    jest.runAllTimers();
    expect(mockHistoryPush).toHaveBeenCalledWith('/SuperAdminAccount');
  });

  test('shows an error message when something went wrong', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Some error'));
    const { getByRole, queryByText, getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
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
            <AddInstitutionOfEducationForm />
          </authContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    await wait(() => {
      userEvent.type(getByLabelText('Назва'), 'UniversityOfTheWorld');
      fireEvent.focusIn(getByLabelText('Назва'));
      fireEvent.focusOut(getByLabelText('Назва'));
      userEvent.selectOptions(getByLabelText('Тип закладу освіти'), [
        'university',
      ]);
      userEvent.type(getByLabelText('Аббревіатура'), 'UOTW');
      userEvent.type(getByLabelText('Адреса'), 'Address');
      userEvent.type(getByLabelText('Сайт'), 'http://site.com');
      userEvent.type(getByLabelText('Електронна адреса'), 'mail@mail.com');
      userEvent.type(getByLabelText('Телефон'), '+380999999999');
      userEvent.click(getByRole('presentation'));
      userEvent.type(
        getByLabelText('Опис'),
        'there should be at least fifty symbols there should be at least fifty symbols'
      );
      userEvent.type(
        getByLabelText('Введіть електронну адресу адміністратора'),
        'vadim.ilchenko@gmailaa.com'
      );
    });

    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    jest.runAllTimers();
    expect(
      queryByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });

  test('shows a response error message', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => mockJsonPromise,
        status: 400,
      })
    );

    const { getByRole, queryByText, getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
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
            <AddInstitutionOfEducationForm />
          </authContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    await wait(() => {
      userEvent.type(getByLabelText('Назва'), 'UniversityOfTheWorld');
      fireEvent.focusIn(getByLabelText('Назва'));
      fireEvent.focusOut(getByLabelText('Назва'));
      userEvent.selectOptions(getByLabelText('Тип закладу освіти'), [
        'university',
      ]);
      userEvent.type(getByLabelText('Аббревіатура'), 'UOTW');
      userEvent.type(getByLabelText('Адреса'), 'Address');
      userEvent.type(getByLabelText('Сайт'), 'http://site.com');
      userEvent.type(getByLabelText('Електронна адреса'), 'mail@mail.com');
      userEvent.type(getByLabelText('Телефон'), '+380999999999');
      userEvent.click(getByRole('presentation'));
      userEvent.type(
        getByLabelText('Опис'),
        'there should be at least fifty symbols there should be at least fifty symbols'
      );
      userEvent.type(
        getByLabelText('Введіть електронну адресу адміністратора'),
        'vadim.ilchenko@gmailaa.com'
      );
    });

    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    jest.runAllTimers();
    expect(
      queryByText('Щось пішло не так, спробуйте знову.')
    ).toBeInTheDocument();
  });

  test('should get validation errors if no values entered', async () => {
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
          <AddInstitutionOfEducationForm />
        </authContext.Provider>
      </Router>
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    expect(getByText('Оберіть тип закладу')).toBeInTheDocument();
  });
});
