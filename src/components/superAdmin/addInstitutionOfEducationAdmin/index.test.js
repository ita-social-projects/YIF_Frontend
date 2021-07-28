import React from 'react';
import { wait, render, screen } from '@testing-library/react';
import AddInstitutionOfEducationAdmin from './index';
import { MemoryRouter } from 'react-router-dom';

const mock = require('../../../services/tokenValidator');

mock.useAuth = jest.fn(() => {
  return {
    token: 'token',
    getToken: jest.fn(() => '123'),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

const data = [
    {
      userId: '0c65916a-a847-4da7-b18f-b3e4d915976c',
      email: 'fmcaagent908@rose2.ga',
    },
    {
      userId: '21807d3d-b793-4d13-bbe2-8d6449af93ee',
      email: 'vweslaine.pg@ericreyess.com',
    },
    {
      userId: '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d',
      email: 'nuweeModerator@gmail.com',
    }
  ];

const dataForSecondFetch = {
  id: '58611427-2d33-4e17-9cee-0cda0470d150',
  name: 'Національний університет водного господарства та природокористування',
  abbreviation: 'НУВГП',
  site: 'https://nuwm.edu.ua/',
  address: 'вулиця Соборна, 11, Рівне, Рівненська область, 33000',
  phone: '380362633209',
  email: 'mail@nuwm.edu.ua',
  description: 'Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу. ',
  imagePath: 'https://klike.net/uploads/posts/2020-04/1587719791_1.jpg',
}

// Values, that we get after the first fetch
const mockFetchPromise = Promise.resolve({
  json: () => Promise.resolve(data),
  status: 200,
});

// Values, that we get after the second fetch
const mockFetchPromiseSecond = Promise.resolve({
  json: () => Promise.resolve(dataForSecondFetch),
  status: 200,
});

global.fetch = jest.fn(() => mockFetchPromise)
  .mockImplementationOnce(() => mockFetchPromiseSecond)

describe('AddIoEadmin page', () => {

  test('Page renders without crashing', async () => {
    await wait(() => {
      render(
        <MemoryRouter>
          <AddInstitutionOfEducationAdmin />
        </MemoryRouter>,
      );
    });

    const content = screen.getByTestId('renderedContent');
    expect(content).toBeInTheDocument();
  });

  test('Check default error', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => mockFetchPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await wait(() => {
      render(
        <MemoryRouter>
          <AddInstitutionOfEducationAdmin />
        </MemoryRouter>
      );
    });

    const placeholder = screen.getByText('Щось пішло не так, спробуйте знову.');
    expect(placeholder).toBeInTheDocument();
  });

  test('Check error with rejected promise', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => Promise.reject("Error"),
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await wait(() => {
      render(
        <MemoryRouter>
          <AddInstitutionOfEducationAdmin />
        </MemoryRouter>,
      );
    });

    const placeholder = screen.getByText('Щось пішло не так, спробуйте знову.');
    expect(placeholder).toBeInTheDocument();
  });

  test('Check spinner ', async () => {
    render(
      <MemoryRouter>
        <AddInstitutionOfEducationAdmin />
      </MemoryRouter>,
    );

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  });
});