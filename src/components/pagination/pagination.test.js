import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Pagination from '.';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Pagination', () => {
  test('render if number of total pages is 0', () => {
    let paginationPage = {
      pages: [],
      totalPages: 0,
    };

    let { totalPages, pages } = paginationPage;

    render(
      <Router>
        <Provider store={store}>
          <Pagination totalPages={totalPages} pages={pages} />
        </Provider>
      </Router>
    );

    const pagination = screen.queryByTestId('pagination');
    expect(pagination).toHaveClass('hiddenElement');
  });

  test('render and click check if current page is equal 1, number of total pages is equal 3', () => {
    let paginationPage = {
      pages: [1, 2, 3],
      currentPage: 1,
      totalPages: 3,
      setCurrentPage: jest.fn((value) => {
        currentPage = value;
      }),
    };

    let { totalPages, setCurrentPage, pages, currentPage } = paginationPage;

    render(
      <Router>
        <Provider store={store}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={() => setCurrentPage}
            pages={pages}
          />
        </Provider>
      </Router>
    );

    const pagination = screen.queryByTestId('pagination');
    expect(pagination).not.toHaveClass('hiddenElement');

    const prevButton = screen.getByTestId('prevPage');
    userEvent.click(prevButton);
    expect(prevButton).toHaveClass('arrowUnable');

    const pageButton1 = screen.getByText('1');
    userEvent.click(pageButton1);
    expect(pageButton1).toHaveClass('page__current');
    expect(pageButton1).toHaveTextContent('1');

    const pageButton2 = screen.getByText('2');
    userEvent.click(pageButton2);
    expect(pageButton2).toHaveTextContent('2');

    const pageButton3 = screen.getByText('3');
    userEvent.click(pageButton3);
    expect(pageButton3).toHaveTextContent('3');

    const nextButton = screen.getByTestId('nextPage');
    userEvent.click(nextButton);
    expect(nextButton).not.toHaveClass('arrowUnable');
    expect(nextButton).toBeEnabled();
  });

  test('render and click check if current page is equal 2, number of total pages is equal 3', () => {
    let paginationPage = {
      pages: [1, 2, 3],
      currentPage: 2,
      totalPages: 3,
      setCurrentPage: jest.fn((value) => {
        currentPage = value;
      }),
    };

    let { totalPages, setCurrentPage, pages, currentPage } = paginationPage;

    render(
      <Router>
        <Provider store={store}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={() => setCurrentPage}
            pages={pages}
          />
        </Provider>
      </Router>
    );

    const pagination = screen.queryByTestId('pagination');
    expect(pagination).not.toHaveClass('hiddenElement');

    const prevButton = screen.getByTestId('prevPage');
    userEvent.click(prevButton);
    expect(prevButton).not.toHaveClass('arrowUnable');

    const pageButton2 = screen.getByText('2');
    userEvent.click(pageButton2);
    expect(pageButton2).toHaveClass('page__current');

    const nextButton = screen.getByTestId('nextPage');
    userEvent.click(nextButton);
    expect(nextButton).not.toHaveClass('arrowUnable');
  });

  test('render and click check if current page is equal 3, number of total pages is equal 3', () => {
    let paginationPage = {
      pages: [1, 2, 3],
      currentPage: 3,
      totalPages: 3,
      setCurrentPage: jest.fn((value) => {
        currentPage = value;
      }),
    };

    let { totalPages, setCurrentPage, pages, currentPage } = paginationPage;

    render(
      <Router>
        <Provider store={store}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={() => setCurrentPage}
            pages={pages}
          />
        </Provider>
      </Router>
    );

    const pagination = screen.queryByTestId('pagination');
    expect(pagination).not.toHaveClass('hiddenElement');

    const prevButton = screen.getByTestId('prevPage');
    userEvent.click(prevButton);
    expect(prevButton).not.toHaveClass('arrowUnable');

    const pageButton3 = screen.getByText('3');
    userEvent.click(pageButton3);
    expect(pageButton3).toHaveClass('page__current');

    const nextButton = screen.getByTestId('nextPage');
    userEvent.click(nextButton);
    expect(nextButton).toHaveClass('arrowUnable');
  });
});
