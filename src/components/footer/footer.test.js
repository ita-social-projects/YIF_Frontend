import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Footer from './index';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('check footer as a whole component', () => {
  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
      container
    );
  });

  let links = container.querySelectorAll('a');
  let buttons = container.querySelectorAll('button');
  let paragraphs = container.querySelectorAll('p');

  expect(
    screen.getByText(
      'Відповідальність за достовірність наданої інформації несуть заклади освіти'
    )
  ).toBeTruthy();
  // check links
  expect(links[0].href).toBe('http://localhost/login');
  expect(links[1].href).toBe('http://localhost/register');
  expect(links[2].href).toBe('http://localhost/mailto:');
  expect(links[3].href).toBe('http://localhost/');
  expect(links[4].href).toBe('http://localhost/directions');
  expect(links[5].href).toBe('http://localhost/institutionsOfEducation');

  expect(links[2].textContent).toBe('support@youritfuture.com');
  // expect(links[3].textContent).toBe("YIF");
  expect(links[4].textContent).toBe('Спеціальності');
  expect(links[5].textContent).toBe('Заклади освіти');

  //check buttons
  expect(buttons[0].textContent).toBe('Вхід');
  expect(buttons[1].textContent).toBe('Реєстрація');

  expect(paragraphs[0].textContent).toBe('Рівне, вул. Словацького, 4-6');
});
