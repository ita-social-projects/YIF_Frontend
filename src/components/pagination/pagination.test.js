import React from 'react';
import { render, screen, queryByText } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Pagination from './pagination';

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
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
        </Provider>
      </Router>
    );
    expect(screen.getAllByText('2')).toHaveLength(1);
  });
});
