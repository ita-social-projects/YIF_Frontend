import React from 'react';
import TabContent from './TabContent';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddInstitutionOfEducationAdmin from '../index';
import { MemoryRouter } from 'react-router-dom';

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

const data2 = {
  errors: {
    IoEid: ['Цей навчальний заклад уже має адміністратора']
  }
}

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

  test('Add new administrator from moderators', async ()=> {

    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <AddInstitutionOfEducationAdmin>
          <TabContent IoEid={IoEid}/>
        </AddInstitutionOfEducationAdmin>
      </MemoryRouter>
    );

    await wait(() => {userEvent.click(getAllByTestId('chooseBtn')[1]);});

    await expect(getByText('Заклад отримав нового адміністратора!')).toBeInTheDocument();
  });

  test('Add new administrator from moderators with error', async()=>{

    const { getByText, getAllByTestId } = render(<TabContent />);

    await wait(()=> {
      userEvent.click(getByText('Вибрати зі списку модераторів'));
    });

    const mockPostPromiseResolveError = Promise.resolve({
      json: () => Promise.resolve({errors: { IoEId: ['Цей навчальний заклад вже має адміністратора']}}),
      status: 400,
    });

    global.fetch = jest.fn().mockImplementationOnce(()=>mockPostPromiseResolveError)

    await wait(() => {
      userEvent.click(getAllByTestId('chooseBtn')[1]);
    });

    await expect(getByText('Цей навчальний заклад вже має адміністратора')).toBeInTheDocument();
  })

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
});