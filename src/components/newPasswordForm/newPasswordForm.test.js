import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewPasswordForm from './index';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// MOCK GRECAPTCHA--------------
// const cap = jest.fn(() => '12weqw');
// const realWindow = window;
// const fakeWindow = jest.spyOn(global, 'window', 'get');
// fakeWindow.mockImplementation(() => ({
//   ...realWindow,
//   grecaptcha: {
//     ready: cap,
//   },
// }));
// MOCK FETCH-----------
// const mockJsonPromise = Promise.resolve('Пароль змінено!');

// const mockFetchPromise = Promise.resolve({
//   json: () => mockJsonPromise,
//   status: 200,
// });
// global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('NewPasswordForm', () => {
  it('input get corect values', async () => {
    act(() => {
      render(
        <Router>
          <NewPasswordForm />
        </Router>,
        container
      );
    });
    await wait(() => {
      userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1@');
      userEvent.type(
        screen.getByPlaceholderText('Підтвердіть пароль'),
        'Qwerty1@'
      );
    });
    expect(screen.getByPlaceholderText('Пароль')).toHaveValue('Qwerty1@');
    expect(screen.getByPlaceholderText('Підтвердіть пароль')).toHaveValue(
      'Qwerty1@'
    );
  });

  it('error when input have incorect values', async () => {
    act(() => {
      render(
        <Router>
          <NewPasswordForm />
        </Router>,
        container
      );
    });
    await wait(() => {
      userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1#');
      userEvent.type(
        screen.getByPlaceholderText('Підтвердіть пароль'),
        'Qwerty1@'
      );
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Паролі мають співпадати')).toBeInTheDocument();
    });
  });

  //     it('changes password', async () => {
  //       act(() => {
  //         render(
  //           <Router>
  //             <NewPasswordForm />
  //           </Router>,
  //           container
  //         );
  //       });
  //       await wait(() => {
  //         userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1@');
  //         userEvent.type(
  //           screen.getByPlaceholderText('Підтвердіть пароль'),
  //           'Qwerty1@'
  //         );
  //         userEvent.click(screen.getByRole('button'));
  //       });

  //       expect(
  //         screen.getByText(
  //           'Ваш пароль змінено! Ви можете увійти за допомогою нового паролю!'
  //         )
  //       ).toBeInTheDocument;
  //       screen.debug();
  //     });

  //     it('error when reject', async () => {
  //       act(() => {
  //         render(
  //           <Router>
  //             <NewPasswordForm />
  //           </Router>,
  //           container
  //         );
  //       });
  //       await wait(() => {
  //         userEvent.type(screen.getByPlaceholderText('Пароль'), 'Qwerty1@');
  //         userEvent.type(
  //           screen.getByPlaceholderText('Підтвердіть пароль'),
  //           'Qwerty1@'
  //         );
  //         userEvent.click(screen.getByRole('button'));
  //       });

  //       expect(
  //         screen.getByText(
  //           'Ваш пароль змінено! Ви можете увійти за допомогою нового паролю!'
  //         )
  //       ).toBeInTheDocument;
  //       screen.debug();
  //     });
});
