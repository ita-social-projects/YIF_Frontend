import React from 'react';
import InstitutionsOfEducationListPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  jest.clearAllMocks();
});

let data = {
  currentPage: 3,
  totalPages: 3,
  responseList: [
    {
      isFavorite: true,
      id: '1',
      abbreviation: 'abbreviation1',
      site: 'site1',
      address: 'address1',
      description: 'description1',
      startOfCampaign: 'startOfCampaign1',
      endOfCampaign: 'endOfCampaign1',
    },
    {
      isFavorite: false,
      id: '2',
      abbreviation: 'abbreviation2',
      site: 'site2',
      address: 'address2',
      description:
        'description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2 description2description2 description2',
      startOfCampaign: 'startOfCampaign2',
      endOfCampaign: 'endOfCampaign2',
    },
    {
      isFavorite: false,
      id: '3',
      abbreviation: 'abbreviation3',
      site: 'site3',
      address: 'address3',
      description: 'description3',
      startOfCampaign: 'startOfCampaign3',
      endOfCampaign: 'endOfCampaign3',
    },
  ],
};
const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const mock = require('../../services/tokenValidator');

mock.useAuth = jest.fn(() => {
  return {
    token: 'token',
    getToken: jest.fn(() => '123'),
  };
});

describe('test IOEFavoritesList component', () => {
  test('check success response', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionsOfEducationListPage />
          </Router>
        </Provider>
      );
    });

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(3);

    const heading = screen.getByTestId('heading');
    expect(heading.innerHTML).toBe('Заклади освіти');

    const pageButtons = screen.getAllByTestId('currentPage');
    await act(async () => {
      fireEvent.click(pageButtons[2]);
    });
    const prevButton = screen.getByTestId('prevPage');
    await act(async () => {
      fireEvent.click(prevButton);
    });

    const nextButton = screen.getByTestId('nextPage');
    await act(async () => {
      fireEvent.click(nextButton);
    });
  });

  test('check error ', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => mockJsonPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionsOfEducationListPage />
          </Router>
        </Provider>
      );
    });

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  test('check pagination with total pages = 1', async () => {
    data = {
      currentPage: 1,
      totalPages: 1,
      responseList: [
        {
          isFavorite: false,
          id: '1',
          abbreviation: 'abbreviation1',
          site: 'site1',
          address: 'address1',
          description: 'description1',
          startOfCampaign: 'startOfCampaign1',
          endOfCampaign: 'endOfCampaign1',
        },
      ],
    };
    const mockJsonPromisePagination = Promise.resolve(data);

    const mockFetchPromisePagination = Promise.resolve({
      json: () => mockJsonPromisePagination,
      status: 200,
    });
    global.fetch = jest
      .fn()
      .mockImplementation(() => mockFetchPromisePagination);

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionsOfEducationListPage />
          </Router>
        </Provider>
      );
    });

    const prevButton = screen.getByTestId('prevPage');
    await act(async () => {
      fireEvent.click(prevButton);
    });

    const nextButton = screen.getByTestId('nextPage');
    await act(async () => {
      fireEvent.click(nextButton);
    });

    const pageButton = screen.getByTestId('currentPage');
    await act(async () => {
      fireEvent.click(pageButton);
    });

    expect(fetch).toBeCalledTimes(1);
  });

  test('click on the star adding to favorites', async () => {
    data = {
      currentPage: 1,
      totalPages: 1,
      responseList: [
        {
          liked: false,
          id: '1',
          abbreviation: 'abbreviation1',
          site: 'site1',
          address: 'address1',
          description: 'description1',
          startOfCampaign: 'startOfCampaign1',
          endOfCampaign: 'endOfCampaign1',
        },
        {
          liked: false,
          id: '2',
          abbreviation: 'abbreviation1',
          site: 'site1',
          address: 'address1',
          description: 'description1',
          startOfCampaign: 'startOfCampaign1',
          endOfCampaign: 'endOfCampaign1',
        },
      ],
    };

    const mockJsonPromiseStar = Promise.resolve(data);

    const mockFetchPromiseStar = Promise.resolve({
      json: () => mockJsonPromiseStar,
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseStar);

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionsOfEducationListPage />
          </Router>
        </Provider>
      );
    });

    const star = screen.getAllByTestId('star');
    await act(async () => {
      fireEvent.click(star[1]);
    });

    expect(fetch).toBeCalledTimes(2);
  });

  test('click on the star deleting from favorites', async () => {
    data = {
      currentPage: 1,
      totalPages: 1,
      responseList: [
        {
          isFavorite: true,
          id: '1',
          abbreviation: 'abbreviation1',
          site: 'site1',
          address: 'address1',
          description: 'description1',
          startOfCampaign: 'startOfCampaign1',
          endOfCampaign: 'endOfCampaign1',
        },
      ],
    };
    const mockJsonPromiseStarDel = Promise.resolve(data);

    const mockFetchPromiseStarDel = Promise.resolve({
      json: () => mockJsonPromiseStarDel,
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseStarDel);

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionsOfEducationListPage />
          </Router>
        </Provider>
      );
    });

    const star = screen.getByTestId('star');

    await act(async () => {
      fireEvent.click(star);
    });

    expect(fetch).toBeCalledTimes(2);
  });

  test('click on the star with bad response ', async () => {
    render(
      <Provider store={store}>
        <Router>
          <InstitutionsOfEducationListPage />
        </Router>
      </Provider>
    );
    await act(async () => {});
    const star = screen.getAllByTestId('star');
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => 'bad news',
        status: 404,
      })
    );
    await act(async () => {
      fireEvent.click(star[0]);
    });
    const placeholder = screen.getByTestId('placeholder');
    expect(fetch).toBeCalledTimes(3);
    expect(placeholder).toBeInTheDocument();
  });

  test('click on the star with no response', async () => {
    render(
      <Provider store={store}>
        <Router>
          <InstitutionsOfEducationListPage />
        </Router>
      </Provider>
    );
    await act(async () => {});
    const star = screen.getAllByTestId('star');
    global.fetch.mockImplementationOnce(() =>
      Promise.reject({
        json: () => 'bad news',
        status: 404,
      })
    );
    await act(async () => {
      fireEvent.click(star[0]);
    });
    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  test('nonauthorized user render', async () => {
    mock.useAuth = jest.fn(() => {
      return {
        token: '',
        getToken: jest.fn(() => undefined),
      };
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <InstitutionsOfEducationListPage />
          </Router>
        </Provider>
      );
    });

    const star = screen.getAllByTestId('star');

    await act(async () => {
      fireEvent.click(star[0]);
    });
    expect(fetch).toBeCalledTimes(1);
  });
});
