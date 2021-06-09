import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import CampaingCard from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';

const mockDate = {
  start: '2021-08-13T00:00:00',
  end: '2021-08-31T00:00:00',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={store}>
        <CampaingCard start={mockDate.start} end={mockDate.end} />
      </Provider>
    </MemoryRouter>,
    div
  );
});

test('renders with props', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <CampaingCard start={mockDate.start} end={mockDate.end} />
      </Provider>
    </MemoryRouter>
  );

  expect(getByText(/13.7.2021/i)).toBeInTheDocument();
  const campaignDateStart = screen.getByText(/13.7.2021/i);
  expect(campaignDateStart).toBeInTheDocument();
  expect(campaignDateStart.tagName).toMatch(/p/i);

  expect(getByText(/31.7.2021/i)).toBeInTheDocument();
  const campaignDateEnd = screen.getByText(/31.7.2021/i);
  expect(campaignDateEnd).toBeInTheDocument();
  expect(campaignDateEnd.tagName).toMatch(/p/i);
});
