import React from 'react';
import { getByTestId, render, screen, wait, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IoEadmin from './index';
import { boolean } from 'yup/lib/locale';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../services/tokenValidator';
import AddInstitutionOfEducationAdmin from '../addInstitutionOfEducationAdmin/index';
import { MemoryRouter } from 'react-router-dom';

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
  
  jest.setTimeout(30000);
  xtest('check function banIoEAdmin', async () => {
    const { getByTestId, getByText, getByRole } = render(
      // <MemoryRouter>
      //   <AddInstitutionOfEducationAdmin>
          <IoEadmin
            adminId={adminId}
            adminEmail={adminEmail}
            isAdminBanned={true}
          />
      //   </AddInstitutionOfEducationAdmin>
      // </MemoryRouter>
    );
    await wait(() => {
      userEvent.click(getByTestId('unlockSign'));
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200,
    });
    await wait(() => {
    expect(
      screen.getByText('Адміністратора навчального закладу розблоковано')
    ).toBeInTheDocument();
    // expect(screen.getByText('Адміністратора навчального закладу заблоковано'));
    });
  });
  xtest('Show error message if caught exception', async () => {
    const { getByRole, getByText } = render(
      <IoEadmin
        adminId={adminId}
        adminEmail={adminEmail}
        isAdminBanned={true}
      />
    );
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        const mockFetchPromise = Promise.resolve({
          json: () => mockJsonPromise,
          status: 200,
        });
        await wait(() => {
      userEvent.click(screen.getByTestId('unlockSign'));
    });
    expect(
      getByText('Щось пішло не так, спробуйте знову')
    ).toBeInTheDocument();
  });
});
