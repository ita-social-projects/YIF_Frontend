import React from 'react';
import styles from './unlock.module.scss';

interface Props {
  handleClick?: () => void;
}

const Unlock: React.FC<Props> = ({ handleClick }) => {
  return (
    <div
      className={styles.container}
      onClick={handleClick}
      data-testid='unlockSign'
    >
      <svg
        className={styles.unlock}
        id='bold'
        height='512'
        viewBox='0 0 24 24'
        width='512'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m18.75 9h-10.75v-3c0-2.206 1.794-4 4-4s4 1.794 4 4c0 .552.447 1 1 1s1-.448 1-1c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25z' />
      </svg>
    </div>
  );
};

export default Unlock;
