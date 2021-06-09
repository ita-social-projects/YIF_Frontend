import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstitutionOfEducationCard from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setRoleReducer } from '../../store/reducers/setRoleReducer';
import { store } from '../../store/store';

const mock = require('../../services/tokenValidator');

describe('IOECard testing', () => {
  test('renders without crashing when user is nonauthorised', async () => {
    mock.useAuth = jest.fn(() => {
      return {
        currentToken: '',
        getToken: jest.fn(() => ''),
      };
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <InstitutionOfEducationCard />
          </Provider>
        </MemoryRouter>
      );
    });

    const star = screen.queryByTestId('star');
    await act(async () => {
      userEvent.hover(star);
    });

    expect(screen.getByText('Будь ласка, увійдіть!')).toBeInTheDocument();
  });

  test('renders with props with authorised as SuperAdmin', () => {
    mock.useAuth = jest.fn(() => {
      return {
        token: 'token',
        getToken: jest.fn(() => '123'),
      };
    });

    store.dispatch(setRoleReducer('SuperAdmin'));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <InstitutionOfEducationCard />
        </Provider>
      </MemoryRouter>
    );

    const stars = screen.queryByTestId('star');
    expect(stars).toBeNull();
  });

  test('check the button link', () => {
    store.dispatch(setRoleReducer('Graduate'));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <InstitutionOfEducationCard />
        </Provider>
      </MemoryRouter>
    );

    const star = screen.getByTestId('star');
    userEvent.hover(star);

    expect(screen.queryByText('Будь ласка, увійдіть!')).toBeNull();
  });

  test('test function handleClick', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InstitutionOfEducationCard onClick={handleClick()} />
        </MemoryRouter>
      </Provider>
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
