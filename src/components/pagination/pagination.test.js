import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Pagination from '.';

afterEach(() => {
  jest.clearAllMocks();
});

const paginationPage = {
  totalPages: '2',
  currentPage: '1',
  setCurrentPage: '1',
  pages: [1, 2],
};

describe('Pagination', () => {
  test('render correctly', () => {
    const { totalPages, currentPage, setCurrentPage, pages } = paginationPage;
    render(
      <Router>
        <Provider store={store}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={() => setCurrentPage}
            pages={pages}
          />
        </Provider>
      </Router>
    );
    expect(screen.getAllByText('2')).toHaveLength(1);

    const nextButton = screen.getByTestId('nextPage');
    fireEvent.click(nextButton);
    expect(nextButton).not.toHaveClass('arrowUnable');

    const prevButton = screen.getByTestId('prevPage');
    fireEvent.click(prevButton);

    const pageButton1 = screen.getByText('2');
    fireEvent.click(pageButton1);

    const pageButton2 = screen.getByText('1');
    fireEvent.click(pageButton2);
  });
});
