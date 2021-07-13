import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IoEadmin from '.';

const adminEmail = 'nuweeModerator@gmail.com';
const adminId = '3e5fbb21-9773-4218-b0ad-e6ff4e485f6d';

const noAdminEmail = null;
const noAdminId = null;

describe('IoEadmin component', () => {
  test('Render corectly', () => {
    render(
        <IoEadmin adminEmail={adminEmail} adminId={adminId}/>
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  test('Check error', () => {
    render(
        <IoEadmin adminEmail={noAdminEmail} adminId={noAdminId}/>
    );
    const error = screen.getByText('Адміністратор не назначений');
    expect(error).toBeInTheDocument();
  });
});
