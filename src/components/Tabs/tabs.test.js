import React from 'react';
import Tabs from './index';
import { render, screen } from '@testing-library/react';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Tabs', () => {
  test('render and work', () => {
    let tabs = {
      children: [
        // {
        //   props: {
        //     title: 'Бюджет',
        //     tabStyle: 'ourSpecialties_tabs__tab',
        //     tabStyle_active: 'ourSpecialties_tabs__tab_active',
        //   },
        // },
        // {
        //   props: {
        //     title: 'Контракт',
        //     tabStyle: 'ourSpecialties_tabs__tab',
        //     tabStyle_active: 'ourSpecialties_tabs__tab_active',
        //   },
        // },
      ],
      tabsStyle: 'tabs__tab',
      tabsContainer: 'tabs__container',
    };

    let { children, tabsStyle, tabsContainer } = tabs;
    render(
      <Tabs
        children={children}
        tabsStyle={tabsStyle}
        tabsContainer={tabsContainer}
      />
    );
    screen.debug();
  });
});
