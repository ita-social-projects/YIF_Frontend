import React from 'react';
import Input from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MemoryRouter } from 'react-router-dom';

describe('Input', () => {
  test('render correctly', () => {
    render(
      <Router>
        <Formik initialValues={{ paymentForm: '' }} onSubmit={() => {}}>
          <Input id='paymentForm' label='Оплата:' name='paymentForm' />
        </Formik>
      </Router>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('can change value', async () => {
    render(
      <Router>
        <Formik initialValues={{ paymentForm: '' }} onSubmit={() => {}}>
          <Input id='paymentForm' label='Оплата:' name='paymentForm' />
        </Formik>
      </Router>
    );
    await wait(() => {
      userEvent.type(screen.getByLabelText('Оплата:'), 'контракт');
    });
    expect(screen.getByRole('textbox')).toHaveValue('контракт');
  });

  test('have props area become textarea element ', () => {
    render(
      <Router>
        <Formik initialValues={{ paymentForm: '' }} onSubmit={() => {}}>
          <Input id='description' label='Опис' name='description' area='true' />
        </Formik>
      </Router>
    );
    expect(screen.getByTestId('textArea')).toBeInTheDocument();
  });
});
