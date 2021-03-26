import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import DirectionCard from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

const directionsList = [
  {
    id: '05',
    name: 'Соціальні та поведінкові науки',
    specialties: [
      {
        id: '051',
        name: 'Економіка (Економічна кібернетика)',
      },
      {
        id: '052',
        name: 'Економіка (Інформаційні технології в бізнесі)',
      },
    ],
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <DirectionCard
          id='05'
          name='Соціальні та поведінкові науки'
          specialties={directionsList[0].specialties}
        />
      </Provider>
    </MemoryRouter>,
    div
  );
});

test('renders with props', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <DirectionCard
          code='05'
          name='Соціальні та поведінкові науки'
          specialties={directionsList[0].specialties}
        />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/05 Соціальні та поведінкові науки/i)).toBeInTheDocument();
  const title = screen.getByText(/05 Соціальні та поведінкові науки/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h2/i);

  expect(getByText(/Економічна кібернетика/i)).toBeInTheDocument();
  const specialty = screen.getByText(/Економічна кібернетика/i);
  expect(specialty).toBeInTheDocument();
  expect(specialty.tagName).toMatch(/h5/i);
});
