import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import InstitutionOfEducationCard from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <InstitutionOfEducationCard />
      </Provider>
    </MemoryRouter>,
    div
  );
});

test('renders with props', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <InstitutionOfEducationCard
          abbreviation='НУВГП'
          site='nuwm.edu.ua'
          address='м. Рівне, вул. Соборна, 11'
          description='Тут буде опис закладу освіти'
          startOfCampaign='2021-08-13T00:00:00'
          endOfCampaign='2021-08-31T00:00:00'
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

  expect(getByText(/Тут буде опис закладу освіти/i)).toBeInTheDocument();
  const description = screen.getByText(/Тут буде опис закладу освіти/i);
  expect(description).toBeInTheDocument();
  expect(description.tagName).toMatch(/p/i);

  expect(getByText(/13.7.2021/i)).toBeInTheDocument();
  const introStart = screen.getByText(/13.7.2021/i);
  expect(introStart).toBeInTheDocument();
  expect(introStart.tagName).toMatch(/p/i);

  expect(getByText(/31.7.2021/i)).toBeInTheDocument();
  const introDeadline = screen.getByText(/31.7.2021/i);
  expect(introDeadline).toBeInTheDocument();
  expect(introDeadline.tagName).toMatch(/p/i);
});

test('check the button link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <InstitutionOfEducationCard />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/Детальніше/i)).toBeInTheDocument();
  const link = screen.getByText(/Детальніше/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName).toMatch(/a/i);
  expect(link).toHaveAttribute(
    'href',
    expect.stringContaining('/institutionOfEducation/')
  );
});

describe('handleClick', () => {
  it('test function handleClick', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InstitutionOfEducationCard onClick={handleClick()} />
        </MemoryRouter>
      </Provider>
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
