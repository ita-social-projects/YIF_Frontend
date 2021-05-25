import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { queryAllByTestId, queryByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSpecialties from '.';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { debug } from 'console';

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
  ];

  const mockJsonPromise = Promise.resolve(data);

  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  test('check success response', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      ReactDOM.render(
        <Router history={history}>
          <Provider store={store}>
            <AddSpecialties />
          </Provider>
        </Router>,
        container
      );
    });

    const directions = queryAllByTestId(container, 'direction');
    expect(directions).toHaveLength(1);

    const heading = queryByTestId(container, 'heading');
    expect(heading.innerHTML).toBe(
      'Додайте спеціальності, які є у вашому університеті'
    );
  });

  test('check error ', async () => {
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
        container
      );
    });

    const placeholder = queryByTestId(container, 'placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  // test('check changes after clicking on button', () => {

  //   // const history = createMemoryHistory();
  //   // await act(async () => {
  //   //   ReactDOM.render(
  //   //     <Router history={history}>
  //   //       <Provider store={store}>
  //   //         <AddSpecialties />
  //   //       </Provider>
  //   //     </Router>,
  //   //     container
  //   //   );
  //   // });

  //   // const toggler = screen.getByTestId('toggler');
  //   // debug(toggler);
  //   // expect(toggler).toHaveTextContent(/додати/i);

  //   // userEvent.click(toggler);
  //   // expect(toggler).toHaveTextContent(/відміна/i);
  // });
});
