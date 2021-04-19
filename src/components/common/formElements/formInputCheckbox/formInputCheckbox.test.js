import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, wait, act } from '@testing-library/react';
import FormInputCheckbox from './index';
import { Formik, Form, Field } from 'formik';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Formik>
        {({}) => {
          return (
            <Form>
              <Field
                id='storeDataCheckbox'
                component={FormInputCheckbox}
                labelText='Прийміть умови зберігання персональної інформації'
                type='checkbox'
                name='storeDataCheckbox'
              />
            </Form>
          );
        }}
      </Formik>
    </MemoryRouter>,
    div
  );
});
