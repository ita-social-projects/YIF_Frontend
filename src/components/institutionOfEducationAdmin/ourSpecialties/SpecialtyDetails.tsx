import React, { useState } from 'react';
import styles from './ourSpecialties.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  index: number;
  code: number;
  name: string;
  id: string;
  paymentForm: string;
  educationForm: string;
  description: string;
  educationalProgramLink: string;
}
const SpecialtyDetails: React.FC<Props> = ({
  index,
  code,
  name,
  id,
  paymentForm,
  educationForm,
  description,
  educationalProgramLink,
}: any) => {
  const [opened, setOpened] = useState(false);
  const handleClick = (e: any) => {
    setOpened(!opened);
  };

  const deleteIcon = (
    <svg
      width='22'
      height='27'
      viewBox='0 0 22 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 0.46875C8.16406 0.46875 7.34375 0.632813 6.75 1.21875C6.15625 1.80469 5.96875 2.63672 5.96875 3.5H2C1.44922 3.5 1 3.94922 1 4.5H0V6.5H22V4.5H21C21 3.94922 20.5508 3.5 20 3.5H16.0312C16.0312 2.63672 15.8438 1.80469 15.25 1.21875C14.6562 0.632813 13.8359 0.46875 13 0.46875H9ZM9 2.53125H13C13.5469 2.53125 13.7188 2.66016 13.7812 2.71875C13.8438 2.77734 13.9688 2.94141 13.9688 3.5H8.03125C8.03125 2.94141 8.15625 2.77734 8.21875 2.71875C8.28125 2.66016 8.45312 2.53125 9 2.53125ZM2 7.5V23.5C2 25.1523 3.34766 26.5 5 26.5H17C18.6523 26.5 20 25.1523 20 23.5V7.5H2ZM6 10.5H8V22.5H6V10.5ZM10 10.5H12V22.5H10V10.5ZM14 10.5H16V22.5H14V10.5Z'
        fill='#EC615B'
      />
    </svg>
  );

  return (
    <li key={index} className={styles.acc_item__subitem}>
      <h3 className={styles.acc_item__subtitle}>
        {code} {name}
      </h3>
      <div className={styles.acc_item__block}>
        <p>
          <strong>Оплата:</strong> {paymentForm}
        </p>
      </div>
      <div className={styles.acc_item__block}>
        <p>
          <strong>Форма навчання:</strong> {educationForm}
        </p>
      </div>
      <div
        className={`${styles.acc_item__block} ${styles.read__more} ${
          opened ? `${styles.read__more__opened}` : null
        }`}
      >
        <div>
          <strong>Опис:</strong>
          <span
            className={`${styles.acc_item__underline}`}
            key={id}
            onClick={(e) => handleClick(e)}
            data-testid='check-open'
          >
            {' '}
            <span className={`${styles.read__more__show}`}> натисніть, щоб показати</span>
            <span className={`${styles.read__more__hide}`}> натисніть, щоб приховати</span>
            {' '}
          </span>
        </div>
        <div className={styles.read__more__details}>
          <p>
            <strong>Освітня програма:</strong> {educationalProgramLink}
          </p>
          <p className={`${styles.read__more__details__description}`}>{description}</p>
        </div>
        <div className={styles.delete__icon}>
          {deleteIcon} <br /> видалити
        </div>
        <Link
          id='edit-btn'
          to={`/editSpecialty`}
          className={` ${styles.animatedButton}`}
        >
          Редагувати
        </Link>
      </div>
    </li>
  );
};

export default SpecialtyDetails;

