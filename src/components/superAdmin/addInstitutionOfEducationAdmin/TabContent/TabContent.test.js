import React from 'react';
import TabContent from './TabContent';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';

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

  test('Page renders without crashing', async () => {
    await act(async () => {
      render(
        <TabContent IoEid={IoEid} />
      );
    });

    const moderators = screen.getAllByTestId('moderator');
    expect(moderators).toHaveLength(3);
  });

  test('"Add by email" and "Add from moderators" buttons works', async () => {
    await act(async () => {
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

  test('check error ', async () => {
    const mockFetchPromiseError = Promise.resolve({
      json: () => mockJsonPromise,
      status: 404,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseError);

    await act(async () => {
      render(
        <TabContent IoEid={IoEid} />
      );
    });

    const placeholder = screen.getByText('Щось пішло не так, спробуйте знову.')
    expect(placeholder).toBeInTheDocument();
  });
});