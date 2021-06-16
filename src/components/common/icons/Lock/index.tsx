import React from 'react';
import styles from './lock.module.scss';
interface Props {
  handleClick?: () => void;
  containerCN?: string;
  svgCN?: string;
}
const Lock: React.FC<Props> = ({ handleClick, containerCN, svgCN }) => {
  return (
    <div
      className={containerCN ? containerCN : styles.container}
      onClick={handleClick}
      data-testid='lockSign'
    >
      <svg
        className={svgCN ? svgCN : styles.lock}
        height='512pt'
        viewBox='-64 0 512 512'
        width='512pt'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m336 192h-16v-64c0-70.59375-57.40625-128-128-128s-128 57.40625-128 128v64h-16c-26.453125 0-48 21.523438-48 48v224c0 26.476562 21.546875 48 48 48h288c26.453125 0 48-21.523438 48-48v-224c0-26.476562-21.546875-48-48-48zm-229.332031-64c0-47.0625 38.269531-85.332031 85.332031-85.332031s85.332031 38.269531 85.332031 85.332031v64h-170.664062zm0 0' />
      </svg>
    </div>
  );
};

export default Lock;
