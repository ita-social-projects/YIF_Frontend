import React from 'react';
import AddInstitutionOfEducationForm from './index';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { requestSecureData } from '../../../services/requestDataFunction';
import { act } from 'react-dom/test-utils';
import { waitForElement } from '@testing-library/dom';

const container = document.createElement('container');

test('renders with blank fields', () => {
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <AddInstitutionOfEducationForm />
      </Provider>
    </MemoryRouter>,
    container
  );

  const name = container.querySelector(
    'input[name="institutionOfEducationName"]'
  );
  const abbreviation = container.querySelector(
    'input[name="institutionOfEducationAbbreviation"]'
  );
  const address = container.querySelector(
    'input[name="institutionOfEducationAddress"]'
  );
  const site = container.querySelector(
    'input[name="institutionOfEducationSite"]'
  );
  const email = container.querySelector(
    'input[name="institutionOfEducationEmail"]'
  );
  const phone = container.querySelector(
    'input[name="institutionOfEducationPhone"]'
  );
  const description = container.querySelector(
    'textarea[name="institutionOfEducationDescription"]'
  );
  const adminEmail = container.querySelector(
    'input[name="institutionOfEducationAdminEmail"]'
  );

  expect(name.tagName).toBe('INPUT');
  expect(abbreviation.tagName).toBe('INPUT');
  expect(address.tagName).toBe('INPUT');
  expect(site.tagName).toBe('INPUT');
  expect(email.tagName).toBe('INPUT');
  expect(description.tagName).toBe('TEXTAREA');
  expect(phone.tagName).toBe('INPUT');
  expect(adminEmail.tagName).toBe('INPUT');

  expect(name.getAttribute('value')).toBe('');
  expect(abbreviation.getAttribute('value')).toBe('');
  expect(address.getAttribute('value')).toBe('');
  expect(site.getAttribute('value')).toBe('');
  expect(email.getAttribute('value')).toBe('');
  expect(description.getAttribute('value')).toBe(null);
  expect(phone.getAttribute('value')).toBe('');
  expect(adminEmail.getAttribute('value')).toBe('');
});

xtest('submit without errors', () => {
  const { container } = render(<AddInstitutionOfEducationForm />);

  const mockJsonPromise = Promise.resolve('Університет додано!');

  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    status: 200,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  const mockHistoryPush = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

  jest.useFakeTimers();

  // await wait(() => {
  userEvent.click(screen.getByRole('button', { name: /Додати/i }));
  // });
  jest.runAllTimers();
  expect(mockHistoryPush).toHaveBeenCalledWith('/SuperAdminAccount');

  // await wait(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
});

test('inputs get correct values', async () => {
  const { getByLabelText, getByTestId } = render(
    <Router>
      <AddInstitutionOfEducationForm />
    </Router>
  );

  await wait(() => {
    userEvent.type(getByLabelText('Назва'), 'UniversityOfTheWorld');
    userEvent.selectOptions(getByTestId('select-type'), ['university']);
    userEvent.type(getByLabelText('Аббревіатура'), 'UOTW');
    userEvent.type(getByLabelText('Адреса'), 'world');
    userEvent.type(getByLabelText('Сайт'), 'http://world.com.ua');
    userEvent.type(getByLabelText('Електронна адреса'), 'email@gmail.com');
    userEvent.type(getByLabelText('Телефон'), '+380999999999');
    userEvent.type(
      getByLabelText('Опис'),
      'Description of the university of the world, the best university in the world'
    );
    // userEvent.click(screen.getByRole('button', { name: /Додати/i }));
  });

  expect(getByLabelText('Назва')).toHaveValue('UniversityOfTheWorld');
  expect(getByTestId('value2').selected).toBe(true);
});
