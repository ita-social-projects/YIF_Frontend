import React from 'react';
import EditSpecialty from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

describe('EditSpecialty', () => {
  test('render component correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <EditSpecialty />
        </Provider>
      </Router>
    );
    expect(screen.getByText('Основна інформація')).toBeInTheDocument();
    expect(screen.getByText('Вимоги до ЗНО')).toBeInTheDocument();
  });

  test('inputs have initial values', () => {
    render(
      <Router>
        <Provider store={store}>
          <EditSpecialty />
        </Provider>
      </Router>
    );
    expect(screen.getByLabelText('Назва:')).toHaveValue();
    expect(screen.getAllByLabelText('Мінімум балів:')).not.toBeNull();
  });

  test('user can change values in input field', async () => {
    render(
      <Router>
        <Provider store={store}>
          <EditSpecialty />
        </Provider>
      </Router>
    );
    const input = screen.getByLabelText('Оплата:');
    await wait(() => {
      userEvent.clear(input);
      userEvent.type(input, 'контракт');
    });
    expect(screen.getByLabelText('Оплата:')).toHaveValue('контракт');
  });
});
