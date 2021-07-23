import React from 'react';
import Tabs from './index';
import Tab from './tab/Tab';
import { render, screen, fireEvent } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

let tabStyle = 'tabStyle';
let tabStyle_active = 'tabStyle_active';
let tabs = {
  children: [
    <Tab
      tabStyle={tabStyle}
      tabStyle_active={tabStyle_active}
      title='Вкладка_1'
    >
      'Бюджет'
    </Tab>,
    <Tab
      tabStyle={tabStyle}
      tabStyle_active={tabStyle_active}
      title='Вкладка_2'
    >
      'Контракт'
    </Tab>,
  ],
  tabsStyle: 'tabs__tab',
  tabsContainer: 'tabs__container',
};

describe('Tabs', () => {
  test('render and work', () => {
    let { children, tabsStyle, tabsContainer } = tabs;
    render(
      <Tabs
        children={children}
        tabsStyle={tabsStyle}
        tabsContainer={tabsContainer}
      />
    );
  });

  test('switched the tab', () => {
    let { children, tabsStyle, tabsContainer } = tabs;
    render(
      <Tabs
        children={children}
        tabsStyle={tabsStyle}
        tabsContainer={tabsContainer}
      />
    );
    const tab1 = screen.getByRole('button', {
      name: 'Вкладка_1',
    });
    const tab2 = screen.getByRole('button', {
      name: 'Вкладка_2',
    });
    const selectedTab = screen.queryByTestId('selectedTab');

    fireEvent.click(tab2);
    expect(selectedTab).toHaveTextContent('Контракт');
    expect(tab2).toHaveClass('tabStyle_active');

    fireEvent.click(tab1);
    expect(selectedTab).toHaveTextContent('Бюджет');
    expect(tab1).toHaveClass('tabStyle_active');
  });
});
