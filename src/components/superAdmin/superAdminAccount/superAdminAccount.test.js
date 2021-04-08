import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react';
import SuperAdminAccount from './superAdminAccount';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { store } from '../../../store/store';

jest.mock('../../../services/tokenValidator', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => '123'),
      };
    },
  };
});

const mockJsonPromise = Promise.resolve('1');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 400,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const institutionOfEducationAdmins = [
  {
    id: '1183f8eb-e8a1-4ad6-bbasadc-df64e685917d',
    user: {
      id: '272c95c1-7873-432e-a8ab-d8177ef27034',
      userName: 'NuweeAdmin',
      email: 'nuweeAdmin@gmail.com',
      phoneNumber: '+380-31-415-9265',
    },
    institutionOfEducation: {
      id: '96487fd4-72ea-4830-84cf-9e4d9bf8950f',
      name:
        'Національний університет водного господарства та природокористування',
      abbreviation: 'НУВГП',
    },
    isBanned: true,
  },
  {
    id: '272c95c1-7fsd87gfdf3-432e-a8ab-d8177ef27034',
    user: {
      id: '272c95c1-787gfdf3-432e-a8ab-d8177ef27034',
      userName: 'eAdmin',
      email: 'min@gmail.com',
      phoneNumber: '+380-31-415-9265',
    },
    institutionOfEducation: {
      id: '96487fd4-72ea-4bbv830-84cf-9e4d9bf8950f',
      name:
        'Національний університет водного господарства та природокористування',
      abbreviation: 'ВИНУВГП',
    },
    isBanned: false,
  },
  {
    id: '1183f8ecxcb-e8fdfda1-4ad6fsd-bbac-df64e685917d',
    user: {
      id: '272c95cdsd1-787gfdf3-432e-a8ab-d8177ef27034',
      userName: 'Admin',
      email: 'mn@gmail.com',
      phoneNumber: '+380-31-415-9265',
    },
    institutionOfEducation: {
      id: '96487xcfd4-72ea-4bbv830-84cf-9e4d9bf8950f',
      name:
        'Національний університет водного господарства та природокористування',
      abbreviation: 'ВИНУГП',
    },
    isBanned: false,
  },
];

afterEach(cleanup);

describe('check SuperAdminAccount component', () => {
  it('renders correctly', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SuperAdminAccount
            institutionOfEducationAdmins={institutionOfEducationAdmins}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(queryByText(/Адміністратори закладів освіти/i)).toBeInTheDocument();
    expect(queryByText(/Електронна адреса/i)).toBeInTheDocument();
  });

  it('check func handleSort', () => {
    const handleSort = jest.fn();
    const { queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SuperAdminAccount
            institutionOfEducationAdmins={institutionOfEducationAdmins}
            handleSort={handleSort('')}
          />
        </MemoryRouter>
      </Provider>
    );
    const sortByUserEmail = queryByTestId('sortByUserEmail');

    fireEvent.click(sortByUserEmail);
    expect(handleSort).toBeCalledTimes(1);

    const sortByAbbreviation = queryByTestId('sortByAbbreviation');
    fireEvent.click(sortByAbbreviation);
    expect(handleSort).toBeCalledTimes(1);

    const sortByBanned = queryByTestId('sortByBanned');
    fireEvent.click(sortByBanned);
    fireEvent.click(sortByBanned);
    expect(handleSort).toBeCalledTimes(1);
  });

  it('check func handlerSearch', async () => {
    const handlerSearch = jest.fn();
    const clearInput = jest.fn();
    const setBanStatus = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SuperAdminAccount
            institutionOfEducationAdmins={institutionOfEducationAdmins}
            handlerSearch={handlerSearch}
            clearInput={clearInput}
            setBanStatus={setBanStatus}
          />
        </MemoryRouter>
      </Provider>
    );
    const searchBox = screen.queryByRole('textbox');
    fireEvent.change(searchBox, { target: { value: 'NuweeAdmin' } });
    expect(searchBox.value).toBe('NuweeAdmin');

    fireEvent.change(searchBox, { target: { value: '' } });
    expect(searchBox.value).toBe('');

    const closeBtn = screen.queryByAltText('close');
    fireEvent.click(closeBtn);

    expect(setBanStatus).toBeCalledTimes(0);
  });

  it('check fetchInstitutionOfEducationesAdmins error from catch ', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SuperAdminAccount
            institutionOfEducationAdmins={institutionOfEducationAdmins}
          />
        </MemoryRouter>
      </Provider>
    );

    const removeAdmin = getAllByTestId('removeAdmin');
    const setBunStatus = getAllByTestId('setBunStatus');
    await wait(() => {
      fireEvent.click(removeAdmin[0]);
      fireEvent.click(setBunStatus[0]);
      fireEvent.click(removeAdmin[1]);
    });
    expect(removeAdmin.length).toBe(3);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(
      await screen.findByText(/Щось пішло не так, спробуйте знову./i)
    ).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('check fetchInstitutionOfEducationesAdmins error from server ', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SuperAdminAccount
            institutionOfEducationAdmins={institutionOfEducationAdmins}
          />
        </MemoryRouter>
      </Provider>
    );

    const removeAdmin = getAllByTestId('removeAdmin');

    const setBunStatus = getAllByTestId('setBunStatus');
    await wait(() => {
      fireEvent.click(removeAdmin[0]);
      fireEvent.click(setBunStatus[0]);

      fireEvent.click(removeAdmin[1]);
    });
    expect(removeAdmin.length).toBe(3);

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(
      await screen.findByText(/Щось пішло не так, спробуйте знову./i)
    ).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it('check if fetchInstitutionOfEducationesAdmins is successful', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'success' }),
        status: 200,
      })
    );

    await act(async () => {
      const { getAllByTestId } = render(
        <Provider store={store}>
          <MemoryRouter>
            <SuperAdminAccount
              institutionOfEducationAdmins={institutionOfEducationAdmins}
            />
          </MemoryRouter>
        </Provider>
      );

      const removeAdmin = getAllByTestId('removeAdmin');

      const setBunStatus = getAllByTestId('setBunStatus');
      await wait(() => {
        fireEvent.click(removeAdmin[0]);
        fireEvent.click(setBunStatus[0]);

        fireEvent.click(removeAdmin[1]);
      });
      expect(removeAdmin.length).toBe(3);

      expect(fetch).toHaveBeenCalledTimes(3);

      expect(await screen.findByText(/success/i)).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });
});
