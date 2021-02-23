import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import UnivListOption from './index.tsx';
// import { Provider } from 'react-redux';
// import { store } from '../../../../store/store.ts';
// import { act } from 'react-dom/test-utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <UnivListOption />
    </MemoryRouter>,
    div
  );
});

// let container = null;
// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// const data = {
//   responseList: [
//     {
//       liked: false,
//       id: 'sdsfsf',
//       abbreviation: 'abbreviation1',
//       site: 'site1',
//       address: 'address1',
//       description: 'description1',
//       startOfCampaign: 'startOfCampaign1',
//       endOfCampaign: 'endOfCampaign1',
//     },
//     {
//       liked: false,
//       id: 'dfijfjenvnciebv',
//       abbreviation: 'abbreviation2',
//       site: 'site2',
//       address: 'address2',
//       description: 'description2',
//       startOfCampaign: 'startOfCampaign2',
//       endOfCampaign: 'endOfCampaign2',
//     },
//   ],
// };
// const mockJsonPromise = Promise.resolve(data);

// const mockFetchPromise = Promise.resolve({
//   json: () => mockJsonPromise,
//   status: 200,
// });
// global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

// it('check success response', async () => {
//   await act(async () => {
//     ReactDOM.render(
//       <Provider store={store}>
//         <UnivListOption />
//       </Provider>,

//       container
//     );
//   });

//   const titles = container.querySelectorAll('h2');
//   expect(titles).toHaveLength(2);
// });

// it('check error ', async () => {
//   const mockFetchPromiseError = Promise.resolve({
//     json: () => mockJsonPromise,
//     status: 404,
//   });
//   global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

//   await act(async () => {
//     ReactDOM.render(
//       <Provider store={store}>
//         <UnivListOption />
//       </Provider>,
//       container
//     );
//   });

//   const titles = container.querySelectorAll('h3');
//   console.log(titles[0].innerHTML);
//   expect(titles).toHaveLength(1);
// });
