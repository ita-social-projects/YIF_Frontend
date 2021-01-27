import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UniversitiesPage from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversitiesPage />
      </Provider>
    </MemoryRouter>,
    div
  );
});

test('render a title', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversitiesPage />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/Список університетів/i)).toBeInTheDocument();
  const title = screen.getByText(/Список університетів/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h1/i);
});
