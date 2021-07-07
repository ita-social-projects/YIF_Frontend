import React from 'react';
import TabTitle from './TabTitle';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

describe('TabTitle', () => {
  test('render and work', () => {
    let tabTitle = {
      selectedTab: 1,
      setSelectedTab: jest.fn((value) => {
        selectedTab = value;
      }),
    };

    let { selectedTab, setSelectedTab } = tabTitle;
    render(
      <TabTitle
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab}
      />
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
  });

  test('styles for isActive is true', () => {
    let tabTitle = {
      title: 'Бюджет',
      selectedTab: 1,
      setSelectedTab: jest.fn((value) => {
        selectedTab = value;
      }),
      tabStyle: 'tabStyle',
      tabStyle_active: 'tabStyle_active',
      isActive: 1,
    };

    let {
      isActive,
      title,
      selectedTab,
      tabStyle,
      tabStyle_active,
      setSelectedTab,
    } = tabTitle;

    render(
      <TabTitle
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab}
        tabStyle={tabStyle}
        tabStyle_active={tabStyle_active}
        isActive={isActive}
        title={title}
      />
    );

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByText('Бюджет')).toBeInTheDocument();
    expect(button).toHaveClass('tabStyle_active');
  });

  test('styles for isActive is false', () => {
    let tabTitle = {
      title: 'Бюджет',
      selectedTab: 1,
      setSelectedTab: jest.fn((value) => {
        selectedTab = value;
      }),
      tabStyle: 'tabStyle',
      tabStyle_active: 'tabStyle_active',
      isActive: false,
    };

    let {
      isActive,
      title,
      selectedTab,
      tabStyle,
      tabStyle_active,
      setSelectedTab,
    } = tabTitle;

    render(
      <TabTitle
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab}
        tabStyle={tabStyle}
        tabStyle_active={tabStyle_active}
        isActive={isActive}
        title={title}
      />
    );
    screen.debug();

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('tabStyle_active');
  });
});
