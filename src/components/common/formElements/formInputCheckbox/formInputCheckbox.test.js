import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
//import { render, fireEvent, wait, act } from '@testing-library/react';
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

// test('should have validation error given input field is touched and error exists on form', async () => {
//   const div = document.createElement('div');
//   const findByTestId = ReactDOM.render(
//     <MemoryRouter>
//       <Formik
//         validate={(values) => {
//           let errors = {};

//           if (!values.storeDataChckbox) {
//             errors.storeDataChckbox = 'Заповніть поле';
//           }

//           return errors;
//         }}
//       >
//         {({ touched, errors }) => {
//           return (
//             <Form>
//               <Field
//                 id='storeDataCheckbox'
//                 component={FormInputCheckbox}
//                 labelText='Прийміть умови зберігання персональної інформації'
//                 type='checkbox'
//                 name='storeDataCheckbox'
//                 placeholder='false'
//               />
//             </Form>
//           );
//         }}
//       </Formik>
//     </MemoryRouter>,
//     div
//   );

//   // Call blur without inputting anything which should trigger a validation error
//   act(() => {
//     fireEvent.blur(input);
//   });

//   const validationErrors = findByTestId('storeDataCheckbox');
//   expect(validationErrors).toBeInTheDocument();
//   expect(validationErrors.tagName).toMatch(/div/i);
//   expect(validationErrors.innerHTML).toBe(
//     'Ви повинні прийняти умови використання'
//   );
// });
