import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import React from "react";
import FormSelect from './index'


it ('renders without crashing', () => {
  const div =document.createElement('div');
  ReactDOM.render(
      <MemoryRouter>
        <Formik
            validate={(values) => {
              let errors = {};
              if (!values.lastName) {
                errors.schoolName = '';
              }
              return errors;
            }}
        >
          {({}) => {
            return (
                <Form>
                  <Field
                      component={FormSelect}
                      type='school'
                      name='school'
                  />
                </Form>
            );
          }}
        </Formik>
      </MemoryRouter>,
      div
  );
});
