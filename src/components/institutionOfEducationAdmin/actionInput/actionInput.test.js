import React from 'react';
import ActionInput from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Formik } from 'formik';

describe('Moderators Page', () => {
  test('renders without crashing', () => {
    const submit = jest.fn();
    render(
      <Router>
        <Formik
          onSubmit={submit}
          initialValues={{
            email: '',
          }}
        >
          <Form>
            <ActionInput name='email' />
          </Form>
        </Formik>
      </Router>
    );
    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('can change input value', async () => {
    const submit = jest.fn();
    render(
      <Router>
        <Formik
          onSubmit={submit}
          initialValues={{
            email: '',
          }}
        >
          <Form>
            <ActionInput name='email' />
          </Form>
        </Formik>
      </Router>
    );
    const input = document.querySelector('input');
    await wait(() => {
      userEvent.type(input, '123');
    });
    expect(input).toHaveValue('123');
  });

  test('call submit function', async () => {
    const submit = jest.fn();
    render(
      <Router>
        <Formik
          onSubmit={submit}
          initialValues={{
            email: '',
          }}
        >
          <Form>
            <ActionInput name='email' />
          </Form>
        </Formik>
      </Router>
    );
    const input = document.querySelector('input');
    await wait(() => {
      userEvent.type(input, '123');
      userEvent.click(screen.getByRole('button'));
    });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
