import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import FormInputProfile from './index'
import {Field, Form, Formik} from "formik";


it ('renders without crashing', () => {
  const div =document.createElement('div');
  ReactDOM.render(
      <MemoryRouter>
        <Formik
            validate={(values) => {
              let errors = {};
              if (!values.lastName) {
                errors.lastName = 'Заповніть поле';
              }
              return errors;
            }}
        >
          {({}) => {
            return (
                <Form>
                  <Field
                      component={FormInputProfile}
                      iconName='lastName'
                      type='lastName'
                      name='lastName'
                      placeholder='Прізвище'
                      value=''
                  />
                </Form>
            );
          }}
        </Formik>
      </MemoryRouter>,
      div
  );
});
