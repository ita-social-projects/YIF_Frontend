import React from 'react';
import EditInstitutionOfEducationInfo from './index';
import userEvent from '@testing-library/user-event';
import { render, act, screen, wait } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock(
  '../../components/institutionOfEducationAdmin/imageUploader',
  () => ({ imageHandler }) => (
    <div
      data-testid='imageHandler'
      onClick={() => {
        imageHandler('foto');
      }}
    >
      foto
    </div>
  )
);

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
  imagePath: 'imagePath',
  institutionOfEducationType: 'University',
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

  test('show error message after validation', async () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfo
          data={data}
          submitHandler={submitHandler}
        />
      </Router>
    );
    await wait(() => {
      userEvent.selectOptions(
        screen.getByTestId('select'),
        screen.getByText('Виберіть тип...')
      );
      userEvent.tab();
    });
    const err = document.querySelector('.selectError');
    expect(err).toBeInTheDocument();
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
    expect(submitHandler).toBeCalled();
  });

  test('image handler work', async () => {
    render(
      <Router>
        <EditInstitutionOfEducationInfo
          data={data}
          submitHandler={submitHandler}
        />
      </Router>
    );

    const imageHandler = screen.getByTestId('imageHandler');
    await wait(() => {
      userEvent.click(imageHandler);
      userEvent.click(screen.getByTestId('button'));
    });
    expect(submitHandler).toBeCalledWith([
      {
        path: '/ImageApiModel',
        op: 'replace',
        value: {
          Photo: 'foto',
        },
      },
    ]);
  });
});
