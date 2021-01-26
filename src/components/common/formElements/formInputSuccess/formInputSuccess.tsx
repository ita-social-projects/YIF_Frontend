import React from 'react';
import styles from './formInputSuccess.module.scss'

interface Props {
  successMessage: string;
}

 export const FormInputSuccess: React.FC<Props> = (props) => {
  const { successMessage } = props;

  const successIcon = (
      <svg width="30"
           height="30"
           viewBox="0 0 30 30"
           fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.4907 10.0688C22.0289 9.58188 21.259 9.56044 20.7714 10.0234L13.007 17.3868L9.30368 13.5845C8.83463 13.1032 8.06559 13.0927 7.58395 13.5618C7.10272 14.0304 7.09258 14.8003 7.56122 15.2815L12.1018 19.9433C12.3397 20.1877 12.6559 20.311 12.973 20.311C13.2738 20.311 13.5746 20.1999 13.8102 19.9773L22.4453 11.7882C22.9326 11.326 22.9532 10.5561 22.4907 10.0688Z" fill="#18A52F"/>
        <path d="M15 0C6.72891 0 0 6.72891 0 15C0 23.2711 6.72891 30 15 30C23.2711 30 30 23.2711 30 15C30 6.72891 23.2711 0 15 0ZM15 27.5676C8.07041 27.5676 2.4324 21.9301 2.4324 15C2.4324 8.07041 8.07035 2.4324 15 2.4324C21.93 2.4324 27.5676 8.07035 27.5676 15C27.5676 21.93 21.93 27.5676 15 27.5676Z" fill="#18A52F"/>
      </svg>

  );
  return (
      <div
          className={ `${styles.success} ${styles.formSuccess}`}
      >
        <div className={styles.iconWrap}>{successIcon}</div>
        <p className={styles.successMessage}>{successMessage}</p>
      </div>
  );
};
