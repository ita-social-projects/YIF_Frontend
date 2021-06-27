import React, { useState } from 'react';
import styles from './ourSpecialties.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Delete from '../../../components/common/icons/Delete';

interface Props {
  code: number;
  name: string;
  id: string;
  paymentForm: string;
  educationForm: string;
  description: string;
  educationalProgramLink: string;
}
const SpecialtyDetails: React.FC<Props> = ({
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

  const { path } = useRouteMatch();

  return (
    <li className={styles.acc_item__subitem}>
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
      <div className={styles.acc_item__block}>
        <p>
          <strong>Освітня програма:</strong> {educationalProgramLink}
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
            <span className={`${styles.read__more__show}`}>
              {' '}
              натисніть, щоб показати
            </span>
            <span className={`${styles.read__more__hide}`}>
              {' '}
              натисніть, щоб приховати
            </span>{' '}
          </span>
        </div>
        <div className={styles.read__more__details}>
          <p className={`${styles.read__more__details__description}`}>
            {description}
          </p>
        </div>
        <div className={styles.delete__icon}>
          <Delete />
        </div>
        <Link
          id='edit-btn'
          to={`${path}/edit`}
          className={` ${styles.animatedButton}`}
        >
          Редагувати
        </Link>
      </div>
    </li>
  );
};

export default SpecialtyDetails;
