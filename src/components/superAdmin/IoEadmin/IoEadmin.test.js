import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import IoEadmin from './index';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../services/tokenValidator';
import { MemoryRouter } from 'react-router-dom';

const adminEmail = 'nuweeModerator@gmail.com';
const adminId = '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d';
const isAdminBanned = true;

const noAdminEmail = null;
const noAdminId = null;

const mockJsonPromise = Promise.resolve('received data');

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('IoEadmin component', () => {
  test('Render correctly', () => {
    render(<IoEadmin adminEmail={adminEmail} adminId={adminId} />);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  test('Check error', () => {
    render(<IoEadmin adminEmail={noAdminEmail} adminId={noAdminId} />);
    const error = screen.getByText('Адміністратор не призначений');
    expect(error).toBeInTheDocument();
  });

  jest.setTimeout(30000);

  test('check function banIoEAdmin', async () => {
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

  test('check function unbanIoEAdmin', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <MemoryRouter>
          <IoEadmin
            adminId={adminId}
            adminEmail={adminEmail}
            isAdminBanned={true}
          />
        </MemoryRouter>
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

  test('Show error message if caught exception', async () => {
    const { getByText, getByTestId, getByRole } = render(
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
  });
});
