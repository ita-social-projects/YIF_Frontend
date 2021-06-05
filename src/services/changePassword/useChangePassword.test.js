import useChangePassword from './useChangePassword';
import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
// import { Provider } from 'react-redux';
import { AuthProvider } from '../tokenValidator';
import { Field, Formik, Form } from 'formik';
import { FormInput } from '../../components/common/formElements/index';
import ChangePassword from '../../components/changePassword/index';



jest.mock('../useCaptcha.tsx', () => ({
  _esModule: true,
  useCaptcha: jest.fn().mockImplementation(() => ({
    getCaptchaToken: jest
      .fn()
      .mockImplementation(() => Promise.resolve('qwertty')),
  })),
}));

const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
// const mockFetchPromiseBad = Promise.resolve({
//   json: () => mockJsonPromise,
//   status: 400,
// });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

// jest.useFakeTimers();

describe('use change password hook', () => {
  const TestComponent = () => {
    const url = 'https://some-pseudo-url.com';
    const { handleSubmit, error, success } = useChangePassword(url);

    return (
      <>
        {error.hasError && (
          <span data-testid='errorMessage'>{error.errorMessage}</span>
        )}
        {success.hasSuccess && (
          <span data-testid='successMessage'>{success.successMessage}</span>
        )}
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              },
            });
          }}
        >
          {() => (
            <>
              {
                <Form>
                  <Field
                    component={FormInput}
                    name='oldPassword'
                    data-testid='oldPassword'
                  />
                  <Field
                    component={FormInput}
                    name='newPassword'
                    data-testid='newPassword'
                  />
                  <Field
                    component={FormInput}
                    name='confirmNewPassword'
                    data-testid='confirmNewPassword'
                  />
                  <input type='submit' data-testid='submitButton' />
                </Form>
              }
            </>
          )}
        </Formik>
      </>
    );
  };

  const mockJsonPromise = Promise.resolve({
    message: 'Пароль успішно змінено',
  });
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    status: 200,
  });
  const mockFetchPromiseBad = Promise.resolve({
    json: () => mockJsonPromise,
    status: 400,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  test('should fill and submit form', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const oldPassword = screen.getByTestId('oldPassword');
    const newPassword = screen.getByTestId('newPassword');
    const confirmNewPassword = screen.getByTestId('confirmNewPassword');

    fireEvent.change(oldPassword, { target: { value: 'QWerty-12' } });
    expect(oldPassword.value).toEqual('QWerty-12');

    fireEvent.change(newPassword, { target: { value: 'QWerty-123' } });
    expect(newPassword.value).toEqual('QWerty-123');

    fireEvent.change(confirmNewPassword, { target: { value: 'QWerty-123' } });
    expect(confirmNewPassword.value).toEqual('QWerty-123');

    const button = screen.getByTestId('submitButton');
    fireEvent.click(button);

    await wait(() => expect(global.fetch).toHaveBeenCalled());
  });

  test('shows a notification of a successful password change', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await wait(() => {
      fireEvent.click(screen.getByTestId('submitButton'));
    });
    expect(screen.getByTestId('successMessage')).toBeInTheDocument();
  });

  test('shows error message from server', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromiseBad);
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await wait(() => {
      fireEvent.click(screen.getByTestId('submitButton'));
    });
    expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
  });
});
