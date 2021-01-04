import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
//import { render, fireEvent, wait, act } from '@testing-library/react';
import FormInput from '.';
import { Formik, Form, Field } from 'formik';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Formik
        validate={(values) => {
          let errors = {};

          if (!values.email) {
            errors.email = 'Заповніть поле';
          }

          return errors;
        }}
      >
        {({}) => {
          return (
            <Form>
              <Field
                component={FormInput}
                iconName='email'
                type='email'
                name='email'
                placeholder='Електронна пошта'
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

// test('should have validation error given input field is touched and error exists on form', async () => {
//   const { getByPlaceholderText, findByTestId } = render(
//     <Formik
//       validate={(values) => {
//         let errors = {};

//         if (!values.email) {
//           errors.email = 'Заповніть поле';
//         }

//         return errors;
//       }}
//     >
//       {({ touched, errors }) => {
//         return (
//           <Form>
//             <Field
//               // touched={{ email: true }}
//               // errors={{ email: true }}
//               component={FormInput}
//               iconName='email'
//               type='email'
//               name='email'
//               placeholder='Електронна пошта'
//               value=''
//             />
//           </Form>
//         );
//       }}
//     </Formik>
//   );

//   const input = getByPlaceholderText('Електронна пошта');

//   // Call blur without inputting anything which should trigger a validation error
//   act(() => {
//     fireEvent.blur(input);
//   });

//   const validationErrors = findByTestId('email');
//   expect(validationErrors).toBeInTheDocument();
//   expect(validationErrors.tagName).toMatch(/div/i);
//   expect(validationErrors.innerHTML).toBe('Заповніть поле');
// });
