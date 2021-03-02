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
    description:
      'Символіка риби містить багато різноманітних, іноді полярно протилежних значень. З часів глибокої давнини риба асоціювалась із Вчителями, світовими Спасителями, праотцями, мудрістю. До символу риби мають відношення індуїстський Вішну, єгипетський Гор, халдейський Оаннес, а також Христос. Учні, послідовники, які живуть у «воді вчення», часто уподібнюються рибам.',
    specialties: [
      { id: '051', name: 'Економіка (Економічна кібернетика)' },
      { id: '051', name: 'Економіка (Інформаційні технології в бізнесі)' },
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
          description='Опис'
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
          description='Опис'
          specialties={directionsList[0].specialties}
        />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/05 Соціальні та поведінкові науки/i)).toBeInTheDocument();
  const title = screen.getByText(/05 Соціальні та поведінкові науки/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h2/i);

  expect(getByText(/Опис/i)).toBeInTheDocument();
  const description = screen.getByText(/Опис/i);
  expect(description).toBeInTheDocument();
  expect(description.tagName).toMatch(/p/i);

  expect(getByText(/Економічна кібернетика/i)).toBeInTheDocument();
  const specialty = screen.getByText(/Економічна кібернетика/i);
  expect(specialty).toBeInTheDocument();
  expect(specialty.tagName).toMatch(/h5/i);
});
