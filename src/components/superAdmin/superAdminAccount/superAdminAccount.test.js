import React from 'react';
import { render, screen } from '@testing-library/react';
import SuperAdminAccount from './superAdminAccount';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';

const universityAdmins = [
  {
    id: '12ewr33',
    universityAbbreviation: 'НУВГП',
    universityName:
      'Національний університет водного господарства та природокористування',
    email: 'email222234@gmail.com',
    isBanned: false,
    isDisabled: false,
    photo: '',
  },
];

test('check SuperAdminAccount as a whole component', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <SuperAdminAccount universityAdmins={universityAdmins} />
      </Provider>
    </MemoryRouter>
  );
  expect(getByText(/Електронна адреса/i)).toBeInTheDocument();
  expect(getByText(/Ім'я/i)).toBeInTheDocument();

  const universityName = screen.getByText(
    /Національний університет водного господарства та природокористування/i
  );
  expect(universityName).toBeInTheDocument();
  expect(universityName.tagName).toMatch(/div/i);

  const email = screen.getByText(/email222234@gmail.com/i);
  expect(email).toBeInTheDocument();
  expect(email.tagName).toMatch(/li/i);

  const universityAbbreviation = screen.getByText(/НУВГП/i);
  expect(universityAbbreviation).toBeInTheDocument();
  expect(universityAbbreviation.tagName).toMatch(/span/i);
});
