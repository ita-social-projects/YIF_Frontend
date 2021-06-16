import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { getAllByTestId, queryAllByTestId, queryByTestId } from '@testing-library/react';
import AddSpecialties from './index';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/dom';

describe('addSpecialties', () => {
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
      id: '21e63ba5-5dba-4719-bf9c-8ca48ad59050',
      name: 'Математика та статистика',
      code: '11',
      specialties: [
        {
          id: '6a4ef81e-4398-472d-85bf-0873d8f17c1f',
          name: 'Математика',
          code: '111',
          checked: false,
        },
        {
          id: 'bb6cfa4a-8ac1-4af6-9ed9-986873afc571',
          name: 'Статистика',
          code: '112',
          checked: false,
        },
        {
          id: 'f5109703-6bce-40ac-891d-39baaddbe06a',
          name: 'Прикладна математика',
          code: '113',
          checked: false,
        },
      ],
    },
    {
      id: '94c4992c-5580-47e3-8d96-a805fb43327d',
      name: 'Інформаційні технології',
      code: '12',
      specialties: [
        {
          id: '6a1393fd-545b-4501-90f1-2949c6c6fabd',
          name: 'Інженерія програмного забезпечення',
          code: '121',
          checked: false,
        },
        {
          id: '675397e4-8886-4351-8107-8cc4221be868',
          name: 'Системний аналіз',
          code: '124',
          checked: false,
        },
        {
          id: 'abe5d4c1-cc71-403c-a32a-0911ec68e6ae',
          name: 'Кібербезпека',
          code: '125',
          checked: false,
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

  test('check if specialties and directions render correctly', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      ReactDOM.render(
        <Router history={history}>
          <Provider store={store}>
            <AddSpecialties />
          </Provider>
        </Router>,
        container,
      );
    });

    const directions = queryAllByTestId(container, 'direction');
    expect(directions).toHaveLength(2);

    const accordions = queryAllByTestId(container, 'specialty');
    expect(accordions).toHaveLength(6);
  });

  test('check if user can choose different types of specialties', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      ReactDOM.render(
        <Router history={history}>
          <Provider store={store}>
            <AddSpecialties />
          </Provider>
        </Router>,
        container,
      );
    });

    const buttons = getAllByTestId(container, 'button');

    buttons.map((button)=>{
      fireEvent.click(button)
    })

    const spans = getAllByTestId(container, 'span');

    spans.map((span)=>{
      expect(span).toBeInTheDocument()
    })
  });

  test('check if error message renders correctly', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => mockJsonPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    const history = createMemoryHistory();
    await act(async () => {
      ReactDOM.render(
        <Router history={history}>
          <Provider store={store}>
            <AddSpecialties />
          </Provider>
        </Router>,
        container,
      );
    });

    const placeholder = queryByTestId(container, 'placeholder');
    expect(placeholder).toBeInTheDocument();
  });
});
