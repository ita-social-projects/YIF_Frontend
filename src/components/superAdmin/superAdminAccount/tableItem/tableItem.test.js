import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableItem from './tableItem';

const admin = {
  id: '1183f8eb-e8a1-4ad6-bbac-df64e685917d',
  user: {
    id: '272c95c1-7873-432e-a8ab-d8177ef27034',
    userName: 'Admin1',
    email: 'nuweeAdmin@gmail.com',
    phoneNumber: '+380-31-415-9265',
  },
  university: {
    id: '96487fd4-72ea-4830-84cf-9e4d9bf8950f',
    name:
      'Національний університет водного господарства та природокористування',
    abbreviation: 'НУВГП',
  },
  isBanned: true,
};
const admin2 = {
  id: '1183f8eb-e8a1-4ad6-bbac-df64e685917d',
  user: {
    id: '272c95c1-7873-432e-a8ab-d8177ef27034',
    email: 'nuweeAdmin@gmail.com',
    phoneNumber: '+380-31-415-9265',
    photo: 'somePath',
  },
  university: {
    id: '96487fd4-72ea-4830-84cf-9e4d9bf8950f',
    name:
      'Національний університет водного господарства та природокористування',
    abbreviation: 'НУВГП',
  },
  isBanned: true,
};

describe('check TableItem component', () => {
  it('renders correctly', () => {
    const { queryByText, rerender } = render(<TableItem admin={admin} />);
    expect(queryByText(/Admin1/i)).toBeInTheDocument();
    expect(queryByText(/nuweeAdmin@gmail.com/i)).toBeInTheDocument();
    expect(
      queryByText(
        /Національний університет водного господарства та природокористування/i
      )
    ).toBeInTheDocument();
    expect(queryByText(/НУВГП/i)).toBeInTheDocument();
    rerender(<TableItem admin={admin2} />);
  });

  it('check func setBanStatus', () => {
    const setBanStatus = jest.fn();
    const { queryByTestId } = render(
      <TableItem admin={admin} setBanStatus={setBanStatus} />
    );
    const bunStatus = queryByTestId('setBunStatus');

    fireEvent.click(bunStatus);
    expect(setBanStatus).toBeCalledTimes(1);
  });

  it('check func removeAdminUniversiti', () => {
    const removeAdminUniversiti = jest.fn();
    const { queryByTestId } = render(
      <TableItem admin={admin} removeAdminUniversiti={removeAdminUniversiti} />
    );
    const removeAdmin = queryByTestId('removeAdmin');

    fireEvent.click(removeAdmin);
    expect(removeAdminUniversiti).toBeCalledTimes(1);
  });
});
