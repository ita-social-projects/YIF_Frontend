import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import UniversitiesListPage from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { act } from 'react-dom/test-utils';

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

it('renders without crashing', () => {
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <Provider store={store}>
          <UniversitiesListPage />
        </Provider>
      </MemoryRouter>,
      container
    );
  });
});

test('render a title', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <UniversitiesListPage />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/Список університетів/i)).toBeInTheDocument();
  const title = screen.getByText(/Список університетів/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/h1/i);
});

// it('renders universities data', async () => {
//   const data = {
//     responseList: [
//       {
//         liked: false,
//         id: 'sdsfsf',
//         abbreviation: 'abbreviation',
//         site: 'site',
//         address: 'address',
//         description: 'description',
//         startOfCampaign: 'startOfCampaign',
//         endOfCampaign: 'endOfCampaign',
//       },
//     ],
//   };
//   const mockJsonPromise = Promise.resolve(data);
//   const mockFetchPromise = Promise.resolve({
//     json: () => mockJsonPromise,
//     status: 200,
//   });
//   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

//   // Используем act асинхронно, чтобы передать успешно завершённые промисы
//   await act(async () => {
//     render(
//       <MemoryRouter>
//         <Provider store={store}>
//           <UniversitiesListPage />
//         </Provider>
//       </MemoryRouter>,
//       container
//     );
//   });

//   expect(container.querySelector('h2').textContent).toBe(
//     data.responseList[0].abbreviation
//   );

//   // выключаем фиктивный fetch, чтобы убедиться, что тесты полностью изолированы
//   global.fetch.mockRestore();
// });
