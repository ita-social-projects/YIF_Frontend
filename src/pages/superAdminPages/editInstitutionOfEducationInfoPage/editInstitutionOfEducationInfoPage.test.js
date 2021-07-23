import React from 'react';
import EditInstitutionOfEducationInfoPage from './index';
import { render, wait, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../services/tokenValidator', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => '123'),
      };
    },
  };
});

const mockJsonPromise = Promise.resolve({
  name: 'University',
  abbreviation: 'UY',
  site: 'https://univ.com',
  address: 'street',
  phone: '+380970707007',
  email: 'univ@mail.com',
  description:
    'The best university in the world! You can learn anything you want here!',
  lat: 0,
  lon: 0,
  imagePath: 'imagePath',
  institutionOfEducationType: 'University',
});
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

beforeEach(() => {
  jest.clearAllMocks();
});



describe('editInstitutionOfEducationInfo', () => {
  describe('fetch data from server', () => {
    test('render component with values', async () => {
      await act(async () => {
        render(
          <Router>
            <EditInstitutionOfEducationInfoPage />
          </Router>
        );
      });
      expect(fetch).toBeCalledTimes(1);
      expect(screen.getByLabelText('Повна назва:')).toHaveValue('University');
    });

    test('error message after bad response from server', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve('bad news'),
          status: 400,
        })
      );
      await act(async () => {
        render(
          <Router>
            <EditInstitutionOfEducationInfoPage />
          </Router>
        );
      });
      expect(fetch).toBeCalledTimes(1);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });

    test('error message after Promise reject', async () => {
      fetch.mockImplementationOnce(() => Promise.reject('API is down'));
      await act(async () => {
        render(
          <Router>
            <EditInstitutionOfEducationInfoPage />
          </Router>
        );
      });
      expect(fetch).toBeCalledTimes(1);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });

  describe('send new data to server', () => {
    test('render component with values', async () => {
      await act(async () => {
        render(
          <Router>
            <EditInstitutionOfEducationInfoPage />
          </Router>
        );
      });
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ message: 'ok' }),
          status: 200,
        })
      );
      await wait(() => {
        userEvent.selectOptions(
          screen.getByTestId('select'),
          screen.getByText('Коледж')
        );
        userEvent.click(screen.getByTestId('button'));
      });

      expect(fetch).toBeCalledTimes(3);
      expect(screen.getByText('Дані успішно змінено!')).toBeInTheDocument();
    });

    test('bad responce from server', async () => {
      await act(async () => {
        render(
          <Router>
            <EditInstitutionOfEducationInfoPage />
          </Router>
        );
      });
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ message: 'bad news' }),
          status: 400,
        })
      );
      await wait(() => {
        userEvent.selectOptions(
          screen.getByTestId('select'),
          screen.getByText('Коледж')
        );
        userEvent.click(screen.getByTestId('button'));
      });

      expect(fetch).toBeCalledTimes(2);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });

    test('promise reject', async () => {
      await act(async () => {
        render(
          <Router>
            <EditInstitutionOfEducationInfoPage />
          </Router>
        );
      });
      fetch.mockImplementationOnce(() => Promise.reject({}));
      await wait(() => {
        userEvent.selectOptions(
          screen.getByTestId('select'),
          screen.getByText('Коледж')
        );
        userEvent.click(screen.getByTestId('button'));
      });

      expect(fetch).toBeCalledTimes(2);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });
});
