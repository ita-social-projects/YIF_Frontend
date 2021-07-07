import React, { ReactElement, useState } from 'react';
import TabTitle from './tabTitle/TabTitle';

type Props = {
  children: ReactElement[];
  tabsStyle: string;
  tabsContainer: string;
};

const Tabs: React.FC<Props> = ({ children, tabsStyle, tabsContainer }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  console.log(children);

  return (
    <div className={tabsContainer}>
      <ul className={tabsStyle}>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            tabStyle={item.props.tabStyle}
            tabStyle_active={item.props.tabStyle_active}
            isActive={selectedTab === index}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
