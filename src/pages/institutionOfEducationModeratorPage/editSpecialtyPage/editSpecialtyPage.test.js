import React from 'react';
import EditSpecialty from './index';
import userEvent from '@testing-library/user-event';
import { render, wait, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('EditSpecialty', () => {
  test('render component correctly', () => {
    render(
      <Router>
        <EditSpecialty />
      </Router>
    );
    expect(screen.getByText('Основна інформація')).toBeInTheDocument();
    expect(screen.getByText('Вимоги до ЗНО')).toBeInTheDocument();
  });

  describe('Input fields', () => {
    test('inputs have initial values', () => {
      render(
        <Router>
          <EditSpecialty />
        </Router>
      );
      expect(screen.getByLabelText('Назва:')).toHaveValue();
      expect(screen.getByLabelText('Опис:')).toBeTruthy();
    });

    test('user can change values in input field', async () => {
      render(
        <Router>
          <EditSpecialty />
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

  describe('Exam Requirements', () => {
    test('possibility to open a window of a choice of subjects', () => {
      render(
        <Router>
          <EditSpecialty />
        </Router>
      );
      userEvent.click(screen.getByText('Додати предмет'));
      expect(screen.getByText('Виберіть предмети')).toBeInTheDocument();
    });

    test('possibility to close a window of a choice of subjects', () => {
      render(
        <Router>
          <EditSpecialty />
        </Router>
      );
      const plusIcon = document.querySelector('.plus');
      userEvent.click(plusIcon);
      expect(screen.getByText('Виберіть предмети')).toBeInTheDocument();
      expect(plusIcon).not.toBeInTheDocument();
      const closeIcon = document.querySelector('.closeContainerIcon');
      userEvent.click(closeIcon);
      expect(screen.getByText('Додати предмет')).toBeInTheDocument();
    });

    test('selected  subject is added to the list of requirements', () => {
      render(
        <Router>
          <EditSpecialty />
        </Router>
      );
      userEvent.click(screen.getByText('Додати предмет'));
      const subjects = document.querySelectorAll('.subject');
      userEvent.click(subjects[0]);
      userEvent.click(subjects[3]);
      const examRequirements = screen.getAllByText('Мінімум балів:');
      expect(examRequirements).toHaveLength(2);
    });

    test('possibility remove selected subjects from the list of requirements', async () => {
      render(
        <Router>
          <EditSpecialty />
        </Router>
      );
      userEvent.click(screen.getByText('Додати предмет'));
      const subjects = document.querySelectorAll('.subject');
      userEvent.click(subjects[0]);
      userEvent.click(subjects[3]);
      const rmButton = document.querySelectorAll('.deleteRequirement');
      expect(rmButton).toHaveLength(2);
      userEvent.click(rmButton[0]);
      expect(screen.getAllByText('Мінімум балів:')).toHaveLength(1);
    });
  });
});
