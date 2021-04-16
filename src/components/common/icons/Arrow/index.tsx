import React from 'react';
import styles from './arrow.module.scss';

const Arrow = () => {
  return (
    <div className={styles.container}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0)'>
          <path
            d='M3 1.59034C3 0.853713 3.76941 0.36991 4.43329 0.689084L4.6 0.769231L19.0472 10.0652C19.6937 10.4812 19.6485 11.4408 18.9658 11.7942L4.6 19.2308L4.43329 19.3109C3.76941 19.6301 3 19.1463 3 18.4097V1.59034Z'
            fill='#12335E'
          />
        </g>
        <defs>
          <clipPath id='clip0'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Arrow;
