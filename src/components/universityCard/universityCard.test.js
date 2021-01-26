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

test('renders with props', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversityCard
          abbreviation='НУВГП'
          site='nuwm.edu.ua'
          address='м. Рівне, вул. Соборна, 11'
          description='Тут буде опис університету'
          startOfCampaign='01.07.2021'
          endOfCampaign='21.08.2021'
        />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/НУВГП/i)).toBeInTheDocument();
  const title = screen.getByText(/НУВГП/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h2/i);

  expect(getByText(/nuwm.edu.ua/i)).toBeInTheDocument();
  const link = screen.getByText(/nuwm.edu.ua/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toMatch(/a/i);
  expect(link).toHaveAttribute('href', 'nuwm.edu.ua');

  expect(getByText(/м. Рівне, вул. Соборна, 11/i)).toBeInTheDocument();
  const adress = screen.getByText(/м. Рівне, вул. Соборна, 11/i);
  expect(adress).toBeInTheDocument();
  expect(adress.tagName).toMatch(/p/i);

  expect(getByText(/Тут буде опис університету/i)).toBeInTheDocument();
  const description = screen.getByText(/Тут буде опис університету/i);
  expect(description).toBeInTheDocument();
  expect(description.tagName).toMatch(/p/i);

  expect(getByText(/01.07.2021/i)).toBeInTheDocument();
  const introStart = screen.getByText(/01.07.2021/i);
  expect(introStart).toBeInTheDocument();
  expect(introStart.tagName).toMatch(/p/i);

  expect(getByText(/21.08.2021/i)).toBeInTheDocument();
  const introDeadline = screen.getByText(/21.08.2021/i);
  expect(introDeadline).toBeInTheDocument();
  expect(introDeadline.tagName).toMatch(/p/i);
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
