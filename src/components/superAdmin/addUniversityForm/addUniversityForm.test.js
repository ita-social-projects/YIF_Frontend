import React from 'react';
import AddUniversityForm from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import ReactDOM from 'react-dom';

const container = document.createElement('container');

it('renders with blank fields', () => {
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <AddUniversityForm />
      </Provider>
    </MemoryRouter>,
    container
  );

  const universityName = container.querySelector(
    'input[name="universityName"]'
  );

  const universityAbbreviation = container.querySelector(
    'input[name="universityAbbreviation"]'
  );
  const universityAdress = container.querySelector(
    'input[name="universityAdress"]'
  );
  const universitySite = container.querySelector(
    'input[name="universitySite"]'
  );
  const universityEmail = container.querySelector(
    'input[name="universityEmail"]'
  );
  const universityPhone = container.querySelector(
    'input[name="universityPhone"]'
  );
  const universityDescription = container.querySelector(
    'textarea[name="universityDescription"]'
  );
  const adminEmail = container.querySelector('input[name="adminEmail"]');

  expect(universityName.tagName).toBe('INPUT');
  expect(universityAbbreviation.tagName).toBe('INPUT');
  expect(universityAdress.tagName).toBe('INPUT');
  expect(universitySite.tagName).toBe('INPUT');
  expect(universityEmail.tagName).toBe('INPUT');
  expect(universityDescription.tagName).toBe('TEXTAREA');
  expect(universityPhone.tagName).toBe('INPUT');
  expect(adminEmail.tagName).toBe('INPUT');

  expect(universityName.getAttribute('value')).toBe('');
  expect(universityAbbreviation.getAttribute('value')).toBe('');
  expect(universityAdress.getAttribute('value')).toBe('');
  expect(universitySite.getAttribute('value')).toBe('');
  expect(universityEmail.getAttribute('value')).toBe('');
  expect(universityDescription.getAttribute('value')).toBe(null);
  expect(universityPhone.getAttribute('value')).toBe('');
  expect(adminEmail.getAttribute('value')).toBe('');
});
