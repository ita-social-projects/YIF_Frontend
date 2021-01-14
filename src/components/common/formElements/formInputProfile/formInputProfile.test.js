import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import FormInputProfile from './index'
import {Field, Form, Formik} from "formik";
//import {render} from "@testing-library/react";



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


/*
it("submits correct values", async () => {
  const { container } = render(<FormInputProfile />)
  const lastName = container.querySelector('input[lastName= "lastName"]')
  const firstName = container.querySelector('input[lastName= "firstName"]')
  const fathersName = container.querySelector('input[lastName= "fathersName"]')
  const email = container.querySelector('input[lastName= "email"]')
  const phone = container.querySelector('input[lastName= "phone"]')
  const school = container.querySelector('input[lastName= "school"]')


  await wait(() => {
    fireEvent.change(lastName, {
      target: {
        value: "mockname"
      }
    })
  })
  await wait(() => {
    fireEvent.change(firstName, {
      target: {
        value: "green"
      }
    })
  })

  await wait(() => {
    fireEvent.change(fathersName, {
      target: {
        value: "mockname"
      }
    })
  })
  await wait(() => {
    fireEvent.change(email, {
      target: {
        value: "mock@email.com"
      }
    })
  })

  await wait(() => {
    fireEvent.change(phone, {
      target: {
        value: "mockname"
      }
    })
  })
  await wait(() => {
    fireEvent.change(school, {
      target: {
        value: "mockname"
      }
    })
  })
  expect(results.innerHTML).toBe(
      '{"lastName":"mockname","firstName":"mockname","fathersName":"mockname","email":"mock@email.com","phone":"mockname", "school":"mockname",}'
  )
})*/
