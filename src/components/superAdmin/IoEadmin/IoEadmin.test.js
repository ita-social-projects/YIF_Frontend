import React from 'react';
import { getByTestId, render, screen, wait, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IoEadmin from '.';
import { boolean } from 'yup/lib/locale';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../services/tokenValidator';


const adminEmail = 'nuweeModerator@gmail.com';
const adminId = '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d';
const isAdminBanned = boolean;

const noAdminEmail = null;
const noAdminId = null;

const mockJsonPromise = Promise.resolve('received data');

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('IoEadmin component', () => {
  xtest('Render correctly', () => {
    render(<IoEadmin adminEmail={adminEmail} adminId={adminId} />);

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  xtest('Check error', () => {
    render(<IoEadmin adminEmail={noAdminEmail} adminId={noAdminId} />);
    const error = screen.getByText('Адміністратор не призначений');
    expect(error).toBeInTheDocument();
  });

  test('IoEadmin is blocked', () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    // await wait(() => {
    const { getByTestId, getByText, getByRole } = render(
      <AuthProvider>
        <IoEadmin
          adminId={adminId}
          adminEmail={adminEmail}
          isAdminBanned={true}
        />
      </AuthProvider>
    );
    // });
    act(() => {
    userEvent.click(screen.getByTestId('lockSign'));
    });
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200,
    });

    // await wait(() => {
    expect(
      getByText('Адміністратора навчального закладу розблоковано')
    ).toBeInTheDocument();
    // expect(screen.getByText('Адміністратора навчального закладу заблоковано'));
    // });
  });
});
