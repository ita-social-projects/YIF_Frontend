import React from 'react';
import EditInstitutionOfEducationInfo from './index';
import userEvent from '@testing-library/user-event';
import { render, act, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

const data = {
  name: 'University',
  abbreviation: 'UY',
  site: 'https://univ.com',
  address: 'street',
  phone: '+380970707007',
  email: 'univ@mail.com',
  description:
    'The best university in the world! You can learn anything you want here!',
  lat: 0,
  lon: 0,
};

const submitHandler = jest.fn();

describe('EditInstitutionOfEducationInfo', () => {
  test('render correctly', () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfo
          data={data}
          submitHandler={submitHandler}
        />
      </Router>
    );
    expect(screen.getByLabelText('Абревіатура:')).toHaveValue('UY');
  });

  test('call submit function', async () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfo
          data={data}
          submitHandler={submitHandler}
        />
      </Router>
    );
    const rrr = screen.getByLabelText('Опис');
    userEvent.type(rrr, 'And more');
    await act(async () => {
      userEvent.click(screen.getByTestId('button'));
    });
    expect(submitHandler).toBeCalledWith({
      name: 'University',
      abbreviation: 'UY',
      site: 'https://univ.com',
      address: 'street',
      phone: '+380970707007',
      email: 'univ@mail.com',
      description:
        'The best university in the world! You can learn anything you want here!And more',
      lat: 0,
      lon: 0,
    });
  });
});
