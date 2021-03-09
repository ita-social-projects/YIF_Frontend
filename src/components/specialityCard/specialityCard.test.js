import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SpecialityCard from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

const specialitiesList = [
  {
    id: '64ef8f57-de92-41f4-a034-51e47abfb5de',
    universityAbbreviation: 'ОА',
    description: 'We are the best university ever',
    examRequirements: [
      {
        name: 'Українська мова та література',
        mark: '150',
        coefficient: '0,25',
      },
      { name: 'Математика', mark: '150', coefficient: '0,45' },
      { name: 'Історія', mark: '150', coefficient: '0,35' },
    ],
    educationFormToDescriptions: [
      {
        educationFormName: 'денна',
      },
      {
        educationFormName: 'заочна',
      },
      {
        educationFormName: 'вечірня',
      },
    ],
    paymentFormToDescriptions: [
      {
        paymentFormName: 'контракт',
      },
      {
        paymentFormName: 'бюджет',
      },
    ],
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <SpecialityCard
          id='64ef8f57-de92-41f4-a034-51e47abfb5de'
          universityAbbreviation='ОА'
          description='Опис'
          examRequirements={specialitiesList[0].examRequirements}
          educationFormToDescriptions={
            specialitiesList[0].educationFormToDescriptions
          }
          paymentFormToDescriptions={
            specialitiesList[0].paymentFormToDescriptions
          }
        />
      </Provider>
    </MemoryRouter>,
    div
  );
});

test('renders with props', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <SpecialityCard
          id='64ef8f57-de92-41f4-a034-51e47abfb5de'
          universityAbbreviation='ОА'
          description='Опис'
          examRequirements={specialitiesList[0].examRequirements}
          educationFormToDescriptions={
            specialitiesList[0].educationFormToDescriptions
          }
          paymentFormToDescriptions={
            specialitiesList[0].paymentFormToDescriptions
          }
        />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/ОА/i)).toBeInTheDocument();
  const title = screen.getByText(/ОА/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h2/i);

  expect(getByText(/Вимоги до ЗНО/i)).toBeInTheDocument();
  const description = screen.getByText(/Вимоги до ЗНО/i);
  expect(description).toBeInTheDocument();
  expect(description.tagName).toMatch(/h3/i);

  expect(getByText(/Miнiмум Бали/i)).toBeInTheDocument();
  const specialty = screen.getByText(/Miнiмум Бали/i);
  expect(specialty).toBeInTheDocument();
  expect(specialty.tagName).toMatch(/h3/i);

  expect(getByText(/Коефiцiент/i)).toBeInTheDocument();
  const coefficient = screen.getByText(/Коефiцiент/i);
  expect(coefficient).toBeInTheDocument();
  expect(coefficient.tagName).toMatch(/h3/i);

  expect(getByTestId('open')).toBeInTheDocument();
  const div = getByTestId('open');
  fireEvent.click(div);
});
