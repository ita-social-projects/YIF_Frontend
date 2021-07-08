import React from 'react';
import styles from './formInputError.module.scss';

interface Props {
  errorMessage: any; //use to input text of error message
  errorFor: 'inputField' | 'form'; // use either of this words to properly locate and present visually this component
  redirectLink?: string; // use only for RegistarationForm
}

const FormInputError: React.FC<Props> = ({
  errorMessage,
  errorFor,
  redirectLink,
}) => {
  const warningIcon = (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19.8091 15.5819L11.2193 0.703984C10.9648 0.263164 10.509 0 10 0C9.49098 0 9.03516 0.263164 8.78066 0.703984L0.190898 15.5819C-0.0636328 16.0227 -0.0636328 16.5491 0.190898 16.9898C0.445391 17.4307 0.901211 17.6938 1.41023 17.6938H18.5898C19.0988 17.6938 19.5546 17.4307 19.8091 16.9898C20.0636 16.5491 20.0636 16.0227 19.8091 15.5819ZM18.793 16.4032C18.7677 16.447 18.7076 16.5205 18.5898 16.5205H1.41023C1.29234 16.5205 1.23227 16.4471 1.20703 16.4032C1.18176 16.3594 1.14809 16.2706 1.20703 16.1686L9.79676 1.29063C9.8557 1.18855 9.94937 1.17328 9.99996 1.17328C10.0506 1.17328 10.1443 1.18852 10.2032 1.29063L18.793 16.1686C18.852 16.2706 18.8183 16.3594 18.793 16.4032Z' />
      <path d='M10.5869 5.33496H9.41357V11.5927H10.5869V5.33496Z' />
      <path d='M10.0001 14.3303C10.4322 14.3303 10.7824 13.9801 10.7824 13.5481C10.7824 13.1161 10.4322 12.7659 10.0001 12.7659C9.56812 12.7659 9.2179 13.1161 9.2179 13.5481C9.2179 13.9801 9.56812 14.3303 10.0001 14.3303Z' />
    </svg>
  );

  return (
    <div
      className={
        errorFor === 'inputField'
          ? `${styles.errorFromInputField}`
          : errorFor === 'form'
          ? `${styles.errorFromForm}`
          : ''
      }
    >
      <div className={styles.iconWrap}>{warningIcon}</div>
      <p className={styles.errorMessage}>
        {errorMessage}

        {redirectLink && (
          <span>
            {' '}
            Для відновлення доступу натисніть <a href={redirectLink}>сюди</a>
          </span>
        )}
      </p>
    </div>
  );
};

export { FormInputError };
