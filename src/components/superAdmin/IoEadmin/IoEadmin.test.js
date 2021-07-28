import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import IoEadmin from './index';
import { AuthProvider } from '../../../services/tokenValidator';
import userEvent from '@testing-library/user-event';
// import waitForElementToBeRemoved from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

const adminEmail = 'nuweeModerator@gmail.com';
const adminId = '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d';
// const isAdminBanned = true;
// const isAdminDeleted = false;

const noAdminEmail = null;
const noAdminId = null;

const mockJsonPromise = Promise.resolve('received data');

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

// const mock = require('../../../services/tokenValidator');

// mock.useAuth = jest.fn(() => {
//   return {
//     token: 'token',
//     getToken: jest.fn(() => '123'),
//   };
// })

describe('IoEadmin component', () => {
  // test1
  test('Renders correctly', () => {
    render(<IoEadmin adminEmail={adminEmail} adminId={adminId} />);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  test('Check when no admin', () => {
    render(<IoEadmin adminEmail={noAdminEmail} adminId={noAdminId} />);
    const error = screen.getByText('Адміністратор не призначений');
    expect(error).toBeInTheDocument();
  });

  test('Check function banIoEAdmin', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <IoEadmin
          adminId={adminId}
          adminEmail={adminEmail}
          isAdminBanned={false}
        />
      </AuthProvider>
    );
    fireEvent.click(getByTestId('unlockSign'));

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200,
    });
    await wait(() => {
      expect(
        screen.getByText('Адміністратора навчального закладу заблоковано')
      ).toBeInTheDocument();
    });
  });

  test('Check function unbanIoEAdmin', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <IoEadmin
          adminId={adminId}
          adminEmail={adminEmail}
          isAdminBanned={true}
        />
      </AuthProvider>
    );
    fireEvent.click(getByTestId('lockSign'));
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    await wait(() => {
      expect(
        screen.getByText('Адміністратора навчального закладу розблоковано')
      ).toBeInTheDocument();
    });
  });

  test('Show when banIoEAdmin caught exception', async () => {
    const { getByText } = render(
      <AuthProvider>
        <IoEadmin adminId={adminId} adminEmail={adminEmail} />
      </AuthProvider>
    );

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.reject('error'),
      status: 400,
    });
    await wait(() => {
      userEvent.click(screen.getByTestId('unlockSign'));
    });
    expect(getByText('Щось пішло не так, спробуйте знову')).toBeInTheDocument();

    // await waitForElementToBeRemoved(() =>
    // queryByText('Щось пішло не так, спробуйте знову')
    // );

    // jest.runAllTimers();
    // await wait(() => {
    //   expect(
    //     getByText('Щось пішло не так, спробуйте знову')
    //   ).not.toBeInTheDocument();
    // }); 
  });

  test('Check when deleteIoEadmin caught exception', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <IoEadmin
          adminId={adminId}
          adminEmail={adminEmail}
          isAdminDeleted={false}
          />
      </AuthProvider>
    );
    fireEvent.click(getByTestId('deleteSign'));
    
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.reject(),
      status: 400,
    });
    await wait(() => {
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову')
        ).toBeInTheDocument();
      });
    });
    
    jest.setTimeout(30000);
    test('Check deleteIoEadmin success', async () => {
      const { getByTestId } = render(
      <AuthProvider>
        <IoEadmin
          adminId={adminId}
          adminEmail={adminEmail}
          isAdminDeleted={false}
        />
      </AuthProvider>
    );
    fireEvent.click(getByTestId('deleteSign'));

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(),
      status: 400, //why?
    });
    await wait(() => {
      expect(
        screen.getByText('Адміністратора навчального закладу видалено')
      ).toBeInTheDocument();
    });
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
