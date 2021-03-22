import React from 'react';
import AddInstitutionOfEducationForm from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import ReactDOM from 'react-dom';

const container = document.createElement('container');

it('renders with blank fields', () => {
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <AddInstitutionOfEducationForm />
      </Provider>
    </MemoryRouter>,
    container
  );

  const institutionOfEducationName = container.querySelector(
    'input[name="institutionOfEducationName"]'
  );
  const institutionOfEducationAbbreviation = container.querySelector(
    'input[name="institutionOfEducationAbbreviation"]'
  );
  const institutionOfEducationAdress = container.querySelector(
    'input[name="institutionOfEducationAdress"]'
  );
  const institutionOfEducationSite = container.querySelector(
    'input[name="institutionOfEducationSite"]'
  );
  const institutionOfEducationEmail = container.querySelector(
    'input[name="institutionOfEducationEmail"]'
  );
  const institutionOfEducationPhone = container.querySelector(
    'input[name="institutionOfEducationPhone"]'
  );
  const institutionOfEducationDescription = container.querySelector(
    'textarea[name="institutionOfEducationDescription"]'
  );
  const institutionOfEducationAdminEmail = container.querySelector(
    'input[name="institutionOfEducationAdminEmail"]'
  );

  expect(institutionOfEducationName.tagName).toBe('INPUT');
  expect(institutionOfEducationAbbreviation.tagName).toBe('INPUT');
  expect(institutionOfEducationAdress.tagName).toBe('INPUT');
  expect(institutionOfEducationSite.tagName).toBe('INPUT');
  expect(institutionOfEducationEmail.tagName).toBe('INPUT');
  expect(institutionOfEducationDescription.tagName).toBe('TEXTAREA');
  expect(institutionOfEducationPhone.tagName).toBe('INPUT');
  expect(institutionOfEducationAdminEmail.tagName).toBe('INPUT');

  expect(institutionOfEducationName.getAttribute('value')).toBe('');
  expect(institutionOfEducationAbbreviation.getAttribute('value')).toBe('');
  expect(institutionOfEducationAdress.getAttribute('value')).toBe('');
  expect(institutionOfEducationSite.getAttribute('value')).toBe('');
  expect(institutionOfEducationEmail.getAttribute('value')).toBe('');
  expect(institutionOfEducationDescription.getAttribute('value')).toBe(null);
  expect(institutionOfEducationPhone.getAttribute('value')).toBe('');
  expect(institutionOfEducationAdminEmail.getAttribute('value')).toBe('');
});

// it('submit correct values', async () => {
//   ReactDOM.render(
//     <MemoryRouter>
//       <RegistrationForm />
//     </MemoryRouter>,
//     container
//   );

//   const passwordNode = container.querySelector('input[name="password"]');
//   const confirmPasswordNode = container.querySelector(
//     'input[name="confirmPassword"]'
//   );
//   const emailNode = container.querySelector('input[name="email"]');

//   await wait(() => {
//     fireEvent.change(passwordNode, {
//       target: {
//         value: 'mockemail',
//       },
//     });
//   });

//   await wait(() => {
//     fireEvent.change(confirmPasswordNode, {
//       target: {
//         value: 'mockemail',
//       },
//     });
//   });
//   await wait(() => {
//     fireEvent.change(emailNode, {
//       target: {
//         value: 'mockemail',
//       },
//     });
//   });

//   const handleClick = jest.fn();
//   const submitButton = container.querySelector('button');

//   submitButton.onclick = handleClick;

//   await wait(() => {
//     fireEvent.click(submitButton);
//   });

//   await wait(() => {
//     expect(handleClick).toHaveBeenCalled();
//   });
// });
