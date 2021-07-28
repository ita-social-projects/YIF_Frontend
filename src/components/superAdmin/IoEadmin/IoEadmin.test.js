import React from 'react';
import { render, screen, wait, fireEvent} from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import IoEadmin from '.';
import { click } from '@testing-library/user-event/dist/click';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import {userEvent} from  '@testing-library/user-event'

afterEach(() => {
  jest.clearAllMocks();
});
  
const data = {message:'Адміністратора видалено'};

const adminEmail = 'nuweeModerator@gmail.com';
const adminId = '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d';
const noAdminEmail = null;
const noAdminId = null;

const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const mock = require('../../../services/tokenValidator');

mock.useAuth = jest.fn(() => {
  return {
    token: 'token',
    getToken: jest.fn(() => '123'),
  };
})

describe('IoEadmin component', () => {
  // test1
  test('Renders when admin is present', () => {
    render(
        <IoEadmin adminId = {adminId} adminEmail = {adminEmail}/>
    );
    const content = screen.getByTestId('contentBlock');
    expect(content).toBeInTheDocument();
    });
  
// test2
  test('RRenders when admin is absent', () => {
    render(
        <IoEadmin adminId = {noAdminId} adminEmail = {noAdminEmail}/>
    );
    const error = screen.getByText('Адміністратор не назначений');
    expect(error).toBeInTheDocument();
  });
  //  test3
   test('Check delete button ', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(data),
      status: 200,
    });
    global.fetch = jest.fn()(() => mockFetchPromise);
    await wait(() => {
      render(
        <IoEadmin />
      );
    });
    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);
    screen.debug();
expect(await screen.findByTestId('formInputSuccess')).toBeInTheDocument();
});
// test31
// test('test4', async ()=> {
//   const mockFetchPromise = Promise.resolve({
//     json: () => Promise.resolve(data),
//     status: 200,
//   });
//     global.fetch = jest.fn()(() => mockFetchPromise);
//     await wait(() => {
//       render(
//         <IoEadmin />
//       );
//     });
//     const deleteButton = screen.getByTestId('deleteButton');
//     fireEvent.click(deleteButton);
//     screen.debug();
//     await expect(screen.getByTestId('formInputSuccess')).toBeInTheDocument();
//   });
})