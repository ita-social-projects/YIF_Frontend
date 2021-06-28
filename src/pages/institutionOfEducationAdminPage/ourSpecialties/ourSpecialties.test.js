import React from 'react';
import ReactDOM from 'react-dom';
import {
  render,
  screen,
  fireEvent,
  getAllByTestId,
} from '@testing-library/react';
import OurSpecialties from '.';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <OurSpecialties />
      </Provider>
    </MemoryRouter>,
    div
  );
});
test('render a title', () => {
  const { getByText, getAllByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <OurSpecialties />
      </Provider>
    </MemoryRouter>
  );
  // expect(getByText(/Спеціальності/i)).toBeInTheDocument();
  // const title = screen.getByText(/Спеціальності/i);
  // expect(title).toBeInTheDocument();
  // expect(title.tagName).toMatch(/h1/i);

  expect(getByText(/Інформаційні технології/i)).toBeInTheDocument();
  const spectitle = screen.getByText(/Інформаційні технології/i);
  expect(spectitle).toBeInTheDocument();
  expect(spectitle.tagName).toMatch(/h3/i);

  // expect(getByText(/124 Комп'ютерні науки/i)).toBeInTheDocument();
  // const spectitle2 = screen.getByText(/124 Комп'ютерні науки/i);
  // expect(spectitle2).toBeInTheDocument();
  // expect(spectitle2.tagName).toMatch(/h3/i);
});

test('render a title', () => {
  const handleClick = jest.fn();
  const { getAllByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <OurSpecialties onClick={handleClick()} />
      </Provider>
    </MemoryRouter>
  );
  const button = getAllByTestId('check-open')[0];
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});
