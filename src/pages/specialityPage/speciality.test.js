import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { queryAllByTestId } from '@testing-library/react';
import SpecialityPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const data = [
  {
    id: '64ef8f57-de92-41f4-a034-51e47abfb5de',
    institutionOfEducationAbbreviation: 'ОА',
    specialtyName: 'Системний аналіз',
    specialtyCode: '124',
    description: 'We are the best institution Of Education ever',
    descriptions: [
      {
        id: '504c2f8c-5520-4eb0-b1e5-f773b492efff',
        educationalProgramLink: 'example.com',
        description: 'base description',
        examRequirements: [
          {
            examName: 'Українська мова та література',
            minimumScore: '150',
            coefficient: '0,25',
          },
          { examName: 'Математика', minimumScore: '150', coefficient: '0,45' },
          { examName: 'Історія', minimumScore: '150', coefficient: '0,35' },
        ],
        educationForm: 'денна',
        paymentForm: 'контракт',
      },
    ],
  },
];

const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

it('check success response', async () => {
  const history = createMemoryHistory();
  await act(async () => {
    ReactDOM.render(
      <Router history={history}>
        <Provider store={store}>
          <SpecialityPage />
        </Provider>
      </Router>,
      container
    );
  });
  const cards = queryAllByTestId(container, 'card');
  expect(cards).toHaveLength(1);
});
