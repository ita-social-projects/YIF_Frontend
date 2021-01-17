import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UniversityCard from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversityCard />
      </Provider>
    </MemoryRouter>,
    div
  );
});

test('render a title', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversityCard />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/НУВГП/i)).toBeInTheDocument();
  const title = screen.getByText(/НУВГП/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h2/i);
});

test('check the button link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversityCard />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/Детальніше/i)).toBeInTheDocument();
  const link = screen.getByText(/Детальніше/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toMatch(/a/i);
  expect(link).toHaveAttribute('href', '/404');
});

test('check the site link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversityCard />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/nuwee.com/i)).toBeInTheDocument();
  const link = screen.getByText(/nuwee.com/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toMatch(/a/i);
  expect(link).toHaveAttribute('href', '/404');
});
