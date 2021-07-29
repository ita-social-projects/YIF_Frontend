import React from 'react';
import { render, screen, wait, fireEvent, act } from '@testing-library/react';
import IoEadmin from './index';
import { AuthProvider } from '../../../services/tokenValidator';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  jest.clearAllMocks();
});

React.useState = jest.fn((value) => isAdminDeleted = value);

const adminEmail = 'nuweeModerator@gmail.com';
const adminId = '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d';
const isAdminDeleted = false;

const noAdminEmail = null;
const noAdminId = null;

const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
jest.useFakeTimers();

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
   act(() => { 
    fireEvent.click(getByTestId('unlockSign'));
   });
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
  
    // jest.runAllTimers();
    //       expect(
    //     screen.queryByText('Щось пішло не так, спробуйте знову')
    //   ).not.toBeInTheDocument();
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
    
    xtest('Check deleteIoEadmin success', async () => {
      const { getByTestId } = render(
      <AuthProvider>
        <IoEadmin
          adminId={adminId}
          adminEmail={adminEmail}
        />
      </AuthProvider>
    );

  fireEvent.click(getByTestId('deleteSign'));
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(),
      status: 200,
    });

    await wait(() => {
      expect(
        screen.getByText('Адміністратора навчального закладу видалено')
      ).toBeInTheDocument();
    });
  });
});
