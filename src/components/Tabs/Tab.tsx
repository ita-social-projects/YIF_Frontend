import React from 'react';

type Props = {
  title: string;
  tabStyle: string;
  tabStyle_active: string;
};

const Tab: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;
