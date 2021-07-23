import React, { useCallback } from 'react';

type Props = {
  title: string;
  index: number;
  tabStyle: string;
  tabStyle_active: string;
  isActive: any;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({
  tabStyle,
  tabStyle_active,
  title,
  setSelectedTab,
  isActive,
  index,
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li>
      <button
        className={isActive ? `${tabStyle_active} ${tabStyle}` : `${tabStyle}`}
        onClick={onClick}
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
