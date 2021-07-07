import React from 'react';
import TabContent from './TabContent';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { authContext } from '../../../../services/tokenValidator';
import { store } from '../../../../store/store';
import { Provider } from 'react-redux';

jest.setTimeout(15000);

const mockHistoryPush = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
        }),
      })
    );

afterEach(() => {
  jest.clearAllMocks();
});

const IoEid = "58611427-2d33-4e17-9cee-0cda0470d150"

const data = [
  {
    userId: '0c65916a-a847-4da7-b18f-b3e4d915976c',
    email: 'fmcaagent908@rose2.ga',
  },
  {
    userId: '21807d3d-b793-4d13-bbe2-8d6449af93ee',
    email: 'nuweeModerator@gmail.com',
  },
  {
    userId: '2ce9dc1d-83ed-499f-baee-9e09a289c4f4',
    email: 'vweslaine.pg@ericreyess.com',
  }
]

const mockJsonPromise = Promise.resolve(data);

const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const mock = require('../../../../services/tokenValidator');

mock.useAuth = jest.fn(() => {
  return {
    token: 'token',
    getToken: jest.fn(() => '123'),
  };
});

describe('Render the TabContent page', () => {

  jest.useFakeTimers();

  test('Page renders without crashing', async () => {
    await wait(() => {
      render(
        <TabContent IoEid={IoEid} />
      );
    });

    const moderators = screen.getAllByTestId('moderator');
    expect(moderators).toHaveLength(3);
  });

  test('"Add by email" and "Add from moderators" buttons works', async () => {
    await wait(() => {
      render(
        <TabContent IoEid={IoEid} />
      );
    });

    const button1 = screen.getByTestId('toggle-btn1');
    button1.click()
    const toggleContent1 = screen.getByTestId('toggle-content-1')
    expect(toggleContent1).toBeInTheDocument()

    const button2 = screen.getByTestId('toggle-btn2');
    button2.click()
    const toggleContent2 = screen.getByTestId('toggle-content-2')
    expect(toggleContent2).toBeInTheDocument()
  });

  test('Check error ', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => mockJsonPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await wait(() => {
      render(
        <TabContent IoEid={IoEid} />
      );
    });

    const placeholder = screen.getByText('Щось пішло не так, спробуйте знову.')
    expect(placeholder).toBeInTheDocument();
  });

  test('Check error with rejected promise', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => Promise.reject("Error"),
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await wait(() => {
      render(
        <TabContent IoEid={IoEid} />
      );
    });

    const placeholder = screen.getByText('Щось пішло не так, спробуйте знову.');
    expect(placeholder).toBeInTheDocument();
  });

  test('Add new administrator by email', async ()=> {
    const mockFetchPromiseModerators = Promise.resolve({
      json: () => Promise.resolve(data),
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseModerators);
    
    const { getByText, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
            <authContext.Provider
              value={{
                token: 'testToken',
                refreshToken: 'Token',
                isExpired: false,
                isRefreshing: false,
                getToken: () => {},
                updateToken: () => {},
                removeToken: () => {},
              }}
            >
              <TabContent />
            </authContext.Provider>
          </MemoryRouter>
        </Provider>
    );
    await wait(()=> {
      userEvent.type(getByLabelText('Електронна адреса'), 'test@gmail.com');
    });
    const mockPostPromiseOK = Promise.resolve({
      json: () => Promise.resolve('Успішний тест'),
      status: 200,
    });
    global.fetch = jest.fn().mockImplementationOnce(()=>mockPostPromiseOK)
    await wait(() => {
      userEvent.click(getByTestId('button', { name: /Додати/i }));
    });
    jest.runAllTimers();
    await expect(getByText('Заклад отримав нового адміністратора!')).toBeInTheDocument();
    await expect(mockHistoryPush).toHaveBeenCalledWith('/superAdminAccount');
  });

  test('Check email validation', async()=> {
    const mockFetchPromiseModerators = Promise.resolve({
      json: () => Promise.resolve(data),
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseModerators);
    const {getByRole, getByText} = render(
      <TabContent IoEid={IoEid} />
    );
    await wait(() => {
      userEvent.click(getByRole('button', { name: /Додати/i }));
    });
    expect(getByText('Заповніть поле')).toBeInTheDocument();
  })


  test('Check for error with resolved promise', async()=>{
      const mockFetchPromiseModerators = Promise.resolve({
      json: () => Promise.resolve(data),
      status: 200,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseModerators);
    
    const { getByText, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
            <authContext.Provider
              value={{
                token: 'testToken',
                refreshToken: 'Token',
                isExpired: false,
                isRefreshing: false,
                getToken: () => {},
                updateToken: () => {},
                removeToken: () => {},
              }}
            >
              <TabContent />
            </authContext.Provider>
          </MemoryRouter>
        </Provider>
    );
    await wait(()=> {
      userEvent.type(getByLabelText('Електронна адреса'), 'test@gmail.com');
    });
    const mockPostPromiseResolveError = Promise.resolve({
      json: () => Promise.resolve('Error!'),
      status: 404,
    });
    global.fetch = jest.fn().mockImplementationOnce(()=>mockPostPromiseResolveError)
    await wait(() => {
      userEvent.click(getByTestId('button', { name: /Додати/i }));
    });
    jest.runAllTimers();
    await expect(getByText('Щось пішло не так, спробуйте знову.')).toBeInTheDocument();
  })

  test('Check for error with resolved promise', async()=>{
    const mockFetchPromiseModerators = Promise.resolve({
    json: () => Promise.resolve(data),
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseModerators);
  
  const { getByText, getByLabelText, getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
          <authContext.Provider
            value={{
              token: 'testToken',
              refreshToken: 'Token',
              isExpired: false,
              isRefreshing: false,
              getToken: () => {},
              updateToken: () => {},
              removeToken: () => {},
            }}
          >
            <TabContent />
          </authContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    await wait(()=> {
      userEvent.type(getByLabelText('Електронна адреса'), 'test@gmail.com');
    });
    const mockPostPromiseReject = Promise.resolve({
      json: () => Promise.reject({
        message:'Щось пішло не так, спробуйте знову.'
      }),
      status: 404,
    });
    global.fetch = jest.fn().mockImplementationOnce(()=>mockPostPromiseReject)
    await wait(() => {
      userEvent.click(getByTestId('button', { name: /Додати/i }));
    });
    jest.runAllTimers();
    await expect(getByText('Щось пішло не так, спробуйте знову.')).toBeInTheDocument();
  })

});