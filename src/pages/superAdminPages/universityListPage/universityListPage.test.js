import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UniversityListPage from '.';

jest.mock('../../../services/tokenValidator.tsx', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => 'token'),
      };
    },
  };
});

const response = {
  responseList: [
    {
      id: '11cc5406-e023-47f7-9ba5-0a36ab918c91',
      name: 'Міжнародний економіко-гуманітарний університет імені академіка Степана Дем’янчука',
      abbreviation: 'МЕГУ',
      site: 'https://www.megu.edu.ua/',
      address: 'вулиця Степана Дем\'янчука, 4, Рівне, Рівненська область, 33000',
      phone: '380362637234',
      email: 'mail@megu.edu.ua',
      description: 'Міжнародний економіко-гуманітарний університет імені академіка Степана Дем’янчука, навчальний заклад, що акредитований за IV рівнем, пропонує здобути освіту за широким вибором різних престижних спеціальностей, які серйозно знадобляться в житті кожному, хто навчатиметься в нашому університеті.',
      imagePath: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      id: "58611427-2d33-4e17-9cee-0cda0470d150",
      name: "Національний університет водного господарства та природокористування",
      abbreviation: "НУВГП",
      site: "https://nuwm.edu.ua/",
      address: "вулиця Соборна, 11, Рівне, Рівненська область, 33000",
      phone: "380362633209",
      email: "mail@nuwm.edu.ua",
      description: "Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу. ",
      imagePath: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    }
  ]
};

const fetchReturnValue = Promise.resolve({
  status: 200,
  json: () => Promise.resolve(response),
});

global.fetch = jest.fn(() => fetchReturnValue);

afterEach(() => {
  jest.clearAllMocks();
});

describe('UniversityListPage tests', () => {

  test('Can get data from server and render it', async () => {
    await wait( () => {
      render(
        <Router>
          <UniversityListPage />
        </Router>
      );
    });

    const university1 = screen.getByText('МЕГУ');
    const university2 = screen.getByText('НУВГП');
    expect(university1).toBeInTheDocument();
    expect(university2).toBeInTheDocument();
  });

  test('Error message appears if needed', async () => {

    const fetchReturnError = Promise.resolve({
      status: 404,
      json: () => Promise.resolve('404'),
    });

    global.fetch = jest.fn(() => fetchReturnError);

    afterEach(() => {
      jest.clearAllMocks();
    });

    await wait(() => {
      render(
        <Router>
          <UniversityListPage />
        </Router>
      );
    });

    const errorMessage = screen.getByText('Щось пішло не так, спробуйте знову.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Check error with rejected promise', async () => {

    const mockFetchPromiseError = Promise.resolve({
      status: 404,
      json: () => Promise.reject("Error")
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    afterEach(() => {
      jest.clearAllMocks();
    });

    await wait(() => {
      render(
        <Router>
          <UniversityListPage />
        </Router>
      );
    });

    const errorMessage = screen.getByText('Щось пішло не так, спробуйте знову.');
    expect(errorMessage).toBeInTheDocument();
  });
});
