import React from 'react';
import ImageUploader from './index';
import userEvent from '@testing-library/user-event';
import { render, screen, wait } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('editInstitutionOfEducationInfo', () => {
  const foto = 'https://nuwm.edu.ua/images/content/admin/nuwmvsh.jpg';

  test('render image uploader', () => {
    render(
      <Router>
        <ImageUploader foto={foto} aspectRatio={16 / 9} text={'університету'} />
      </Router>
    );
    expect(
      screen.getByAltText('institutionOfEducationFoto')
    ).toBeInTheDocument();
  });
  test('open popup after clicking', async () => {
    render(
      <Router>
        <ImageUploader foto={foto} aspectRatio={16 / 9} text={'університету'} />
      </Router>
    );

    await wait(() => {
      userEvent.click(screen.getByAltText('institutionOfEducationFoto'));
    });
    expect(screen.getByText(`Виберіть фото з комп'ютера`)).toBeInTheDocument();
  });
});
