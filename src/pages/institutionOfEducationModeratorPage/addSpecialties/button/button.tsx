import React from 'react';
import styles from './button.module.scss';

const Button = (props: any) => {
  const { value, onClick, educationForm } = props;

  const checkedIcon = (
    <svg
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.432 6.689C3.52487 6.59603 3.63516 6.52227 3.75656 6.47195C3.87796 6.42162 4.00808 6.39572 4.1395 6.39572C4.27091 6.39572 4.40104 6.42162 4.52244 6.47195C4.64384 6.52227 4.75413 6.59603 4.847 6.689L6.968 8.81001L13.147 2.631C13.2398 2.53978 13.3497 2.46775 13.4703 2.41903C13.591 2.37031 13.7201 2.34585 13.8502 2.34706C13.9803 2.34827 14.1089 2.37511 14.2287 2.42607C14.3484 2.47702 14.4569 2.55108 14.548 2.644L16.67 4.766C16.8573 4.94993 16.9639 5.20064 16.9665 5.46311C16.9692 5.72558 16.8675 5.97837 16.684 6.166L7.662 15.187C7.56914 15.2782 7.45921 15.3501 7.33851 15.3988C7.21782 15.4474 7.08872 15.4718 6.9586 15.4705C6.82848 15.4692 6.69989 15.4422 6.58019 15.3912C6.46049 15.3401 6.35202 15.266 6.261 15.173L1.311 10.223C1.21808 10.1303 1.14437 10.0202 1.09407 9.89895C1.04377 9.77772 1.01788 9.64776 1.01788 9.51651C1.01788 9.38525 1.04377 9.25529 1.09407 9.13406C1.14437 9.01283 1.21808 8.90271 1.311 8.81001L3.432 6.689Z'
        fill='#444444'
      />
    </svg>
  );

  return (
    <button
      data-testid='button'
      className={`${styles.btn} ${styles.animatedButtonTransparent} ${
        educationForm ? styles.btn_checked : ''
      }`}
      onClick={onClick}
    >
      {value}
      {educationForm && (
        <span data-testid='span' className={styles.btn_checked_icon}>{checkedIcon}</span>
      )}
    </button>
  );
};

export default Button;
