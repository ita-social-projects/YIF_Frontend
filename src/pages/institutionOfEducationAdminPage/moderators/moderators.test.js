import React from 'react';
import Moderators from './index';
import userEvent from '@testing-library/user-event';
import { render, screen, wait } from '@testing-library/react';

jest.mock('../../../services/tokenValidator.tsx', () => {
  return {
    useAuth: () => {
      return {
        getToken: jest.fn(() => 'token'),
      };
    },
  };
});

const moderatorsList = [
  {
    moderatorId: '1b9cd6d8-94f9-49ac-b902-cc20e0652c9e',
    userId: '70adb423-2780-4848-8094-a1645e2df2c7',
    email: 'braveKnight@gmail.com',
    isBanned: 'False',
  },
];
const fetchReturnValue = Promise.resolve({
  status: 200,
  json: () => Promise.resolve(moderatorsList),
});

global.fetch = jest.fn(() => fetchReturnValue);

afterEach(() => {
  jest.clearAllMocks();
});

jest.useFakeTimers();

describe('Render the Moderator page', () => {
  test('renders page when moderators already selected', async () => {
    render(<Moderators />);

    //spinner appears on load
    expect(document.getElementsByClassName('loadingScreen')[0]).toBeDefined();

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveReturnedWith(fetchReturnValue);
      expect(screen.getByText('Модератори')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText(moderatorsList[0].email)).toBeInTheDocument();
    });

    //spinner dissapears after page loaded
    expect(document.getElementsByClassName('loadingScreen')[0]).toBeUndefined();
  });

  test('renders page when no moderators already selected', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve([]),
      })
    );
    render(<Moderators />);

    expect(document.getElementsByClassName('loadingScreen')[0]).toBeDefined();

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Модератори')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('Немає обраних модераторів'));
    });
  });

  test('renders page on server error(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 500,
      json: () => Promise.resolve('Internal Server Error'),
    });
    fetch.mockImplementationOnce(() => newFetchReturn);
    render(<Moderators />);

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveReturnedWith(fetchReturnValue);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });

  test('renders page on exception in requestSecureData function(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 404,
      json: () => Promise.reject('Error'),
    });
    fetch.mockImplementationOnce(() => newFetchReturn);
    render(<Moderators />);

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveReturnedWith(newFetchReturn);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });
});

describe('Add new moderator on the Moderator page', () => {
  beforeEach(async () => {
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('type correct email of a new moderator', async () => {
    const newFetchReturn = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          message: 'Модератора було додано',
        }),
    });

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.type(screen.getByRole('textbox'), 'onlyTheBrave@gmail.com');
    userEvent.click(screen.getByText('Додати'));

    await wait(() => {
      //second fetch call should add new moderator
      expect(fetch).toHaveNthReturnedWith(2, newFetchReturn);
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(screen.getByTestId('successMessage')).toBeInTheDocument();
      expect(screen.getByText('Модератора було додано')).toBeInTheDocument();
      jest.runAllTimers();
      expect(screen.queryByTestId('successMessage')).not.toBeInTheDocument();
    });
  });

  test('type incorrect email of a new moderator', async () => {
    userEvent.type(screen.getByRole('textbox'), 'onlyTheB@r#ave@gmail.com');
    userEvent.click(screen.getByText('Додати'));

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Введіть дійсну електронну пошту'));
    });
  });

  test('type email of the moderator that was already select(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 400,
      json: () => Promise.resolve({ message: 'Користувач уже є модератором' }),
    });

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.type(screen.getByRole('textbox'), 'onlyTheBrave@gmail.com');
    userEvent.click(screen.getByText('Додати'));

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(screen.getByText('Користувач уже є модератором'));
    });
  });

  test('type and submit and caught exception in requestSecureData function(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 404,
      json: () => Promise.reject('Error'),
    });

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.type(screen.getByRole('textbox'), 'onlyTheBrave@gmail.com');
    userEvent.click(screen.getByText('Додати'));

    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });
});

describe('Block/Unblock moderator on the Moderators page', () => {
  test('accept blocking of a moderator after click on the block icon', async () => {
    const newFetchReturn = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          message: 'Модератор забанений',
        }),
    });
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('unlockSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так')).toBeInTheDocument();

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveNthReturnedWith(2, newFetchReturn);
      expect(fetch).toBeCalledTimes(3);
      expect(screen.queryByTestId('confirmationBox')).toBeNull();
    });
  });

  test('accept blocking of a moderator after click on the block icon, after that server error occured(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 500,
      json: () => Promise.resolve('Internal Server Error'),
    });
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('unlockSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так')).toBeInTheDocument();

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(fetch).toBeCalledTimes(2);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });

  test('accept blocking of a moderator after click on the block icon, after that caught exception in requestSecureData function(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 404,
      json: () => Promise.reject('Error'),
    });
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('unlockSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так')).toBeInTheDocument();

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(
        screen.getByText('Щось пішло не так, спробуйте знову.')
      ).toBeInTheDocument();
    });
  });

  test('accept unblocking of a moderator after click on the unblock icon', async () => {
    const newFetchReturn = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          message: 'Модератор розбанений',
        }),
    });
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve([
            {
              moderatorId: '1b9cd6d8-94f9-49ac-b902-cc20e0652c9e',
              userId: '70adb423-2780-4848-8094-a1645e2df2c7',
              email: 'braveKnight@gmail.com',
              isBanned: 'True',
            },
          ]),
      })
    );
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('lockSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так')).toBeInTheDocument();

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveNthReturnedWith(2, newFetchReturn);
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(screen.queryByTestId('confirmationBox')).toBeNull();
    });
  });
});

describe('Delete moderator on the Moderators page', () => {
  test('accept deletion of a moderator, after that server error occured(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          message: 'Цей модератор видалений',
        }),
    });
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('deleteSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так'));

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(screen.queryByTestId('confirmationBox')).toBeNull();
    });
  });

  test('accept deletioin of a moderator, after that server error occured(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 404,
      json: () =>
        Promise.resolve({
          message: 'Модератора закладу освіти не знайдено для цього адміна',
        }),
    });
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('deleteSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так'));

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(screen.queryByTestId('confirmationBox')).toBeNull();
    });
  });

  test('accept deletioin of a moderator, after that caught exception in requestSecureData function(error)', async () => {
    const newFetchReturn = Promise.resolve({
      status: 404,
      json: () => Promise.reject('Error'),
    });
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('deleteSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Так'));

    fetch.mockImplementationOnce(() => newFetchReturn);

    userEvent.click(screen.getByText('Так'));

    await wait(() => {
      expect(fetch).toHaveLastReturnedWith(newFetchReturn);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(screen.queryByTestId('confirmationBox')).toBeNull();
    });
  });
});

describe('Block/Unblock or Delete of a moderator', () => {
  test('try to clik on another block/unblock icon while confirmationBox stays opened', async () => {
    const newFetchReturn = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve([
          {
            moderatorId: '1b9cd6d8-94f9-49ac-b902-cc20e0652c9e',
            userId: '70adb423-2780-4848-8094-a1645e2df2c7',
            email: 'braveKnight@gmail.com',
            isBanned: 'False',
          },
          {
            moderatorId: 'b2c68309-d415-4466-a685-2f949d5a3d5d',
            userId: '5f140690-8804-42d8-8dc7-5d71a6bafa5b',
            email: 'example@gmail.com',
            isBanned: 'False',
          },
        ]),
    });
    fetch.mockImplementationOnce(() => newFetchReturn);
    await wait(() => {
      render(<Moderators />);
    });

    userEvent.click(screen.getAllByTestId('unlockSign')[0]);
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByTestId('confirmationBox')).toContainHTML(
      '<span class="highlighted">braveKnight@gmail.com</span>'
    );

    //confirmationBox remains the same
    userEvent.click(screen.getAllByTestId('unlockSign')[1]);
    expect(screen.getByTestId('confirmationBox')).toContainHTML(
      '<span class="highlighted">braveKnight@gmail.com</span>'
    );
  });

  test('try to clik on another delete icon while confirmationBox stays opened', async () => {
    const newFetchReturn = Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve([
          {
            moderatorId: '1b9cd6d8-94f9-49ac-b902-cc20e0652c9e',
            userId: '70adb423-2780-4848-8094-a1645e2df2c7',
            email: 'braveKnight@gmail.com',
            isBanned: 'False',
          },
          {
            moderatorId: 'b2c68309-d415-4466-a685-2f949d5a3d5d',
            userId: '5f140690-8804-42d8-8dc7-5d71a6bafa5b',
            email: 'example@gmail.com',
            isBanned: 'False',
          },
        ]),
    });
    fetch.mockImplementationOnce(() => newFetchReturn);
    await wait(() => {
      render(<Moderators />);
    });

    userEvent.click(screen.getAllByTestId('deleteSign')[0]);
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByTestId('confirmationBox')).toContainHTML(
      '<span class="highlighted">braveKnight@gmail.com</span>'
    );

    //confirmationBox remains the same
    userEvent.click(screen.getAllByTestId('deleteSign')[1]);
    expect(screen.getByTestId('confirmationBox')).toContainHTML(
      '<span class="highlighted">braveKnight@gmail.com</span>'
    );
  });

  test('not accept blocking/unblocking or deleting of a moderator', async () => {
    await wait(() => {
      render(<Moderators />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('unlockSign'));
    expect(screen.getByTestId('confirmationBox')).toBeInTheDocument();
    expect(screen.getByText('Ні')).toBeInTheDocument();

    userEvent.click(screen.getByText('Ні'));

    expect(screen.queryByTestId('confirmationBox')).toBeNull();
  });
});
