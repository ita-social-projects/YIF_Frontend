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
    description: 'We are the best institution Of Education ever',
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
