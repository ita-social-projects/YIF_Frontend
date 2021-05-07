import { Link } from 'react-router-dom';
import styles from './specialityCard.module.scss';
import React, { useState } from 'react';
import Star from '../common/icons/Star/star';
import More from '../common/icons/More/index';

interface Props {
  code: number;
  institutionOfEducationAbbreviation: string;
  examRequirements: any;
  institutionOfEducationId: string;
  description: string;
  educationalProgramLink: string;
  educationForm: string;
  paymentForm: string;
}

const SpecialityCard: React.FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);
  let {
    code,
    institutionOfEducationAbbreviation,
    examRequirements,
    educationForm,
    paymentForm,
    educationalProgramLink,
    description,
    institutionOfEducationId,
  } = props;

  const handlerClick = () => setOpened(!opened);
  const result = examRequirements.map((item: any, idx: number) => (
    <li key={idx} className={styles.card__content__line}>
      <div className={styles.card__content_subject}>{item.examName}</div>
      <div className={styles.card__content_mark}>
        мінімум <strong>{item.minimumScore}</strong> балів
      </div>
      <div className={styles.card__content_coefficient}>{item.coefficient}</div>
    </li>
  ));

  return (
    <div
      data-testid='card'
      id='specialityCard'
      data-id={code}
      className={styles.specialityCard}
    >
      <div className={`container`}>
        <div className={styles.card}>
          <div className={styles.card__top}>
            <h2 className={styles.subtitle}>
              {institutionOfEducationAbbreviation}{' '}
            </h2>

            <Link
              id='moreDetailsButton'
              to={`/institutionOfEducation/${institutionOfEducationId}`}
              className={`${styles.card__content__link} ${styles.animatedButton}`}
            >
              Детальніше
            </Link>
            <Star />
          </div>
          <ul className={styles.card__content}>
            <li className={styles.card__content__line}>
              <div className={styles.card__content_title}>
                <h3>Вимоги до ЗНО:</h3>
              </div>
              <div className={styles.card__content_title}>
                <h3>Miнiмум Бали</h3>
              </div>
              <div className={styles.card__content_title}>
                <h3>Коефiцiент</h3>
              </div>
            </li>
            {result}
          </ul>
          <div
            className={`${styles.card__more} ${
              opened ? `${styles.card__more__opened}` : ''
            }`}
          >
            <div className={styles.card__details}>
              <p>
                <strong>Форма навчання:</strong> {educationForm}{' '}
              </p>
              <p>
                <strong>Форма оплати:</strong> {paymentForm}{' '}
              </p>
              <p>
                <strong>Освітня програма:</strong> {educationalProgramLink}{' '}
              </p>
              <p>{description}</p>
            </div>
            <div
              data-testid='open'
              className={styles.card__more__btn}
              onClick={handlerClick}
            >
              <p className={styles.card__details__btn}>Детальніше</p>
              <More />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialityCard;
