import React from 'react';
import { Link } from 'react-router-dom';
import styles from './institutionOfEducationCard.module.scss';
import Tooltips from '../common/tooltip';
import CampaingCard from '../campaignCard';
import { store } from '../../store/store';
import Star from '../common/icons/Star/star';

interface Props {
  liked?: boolean;
  id: any;
  handleClick?: () => void;
  data?: any;
  abbreviation: string;
  site: string;
  address: string;
  description: string;
  startOfCampaign: string;
  endOfCampaign: string;
}

const InstitutionOfEducationCard: React.FC<Props> = (props) => {
  const token = localStorage.getItem('token');
  const { currentRole } = store.getState();
  const isGraduate = currentRole.role === 'Graduate' ? true : false;

  let {
    liked,
    id,
    data,
    handleClick,
    abbreviation,
    site,
    address,
    description,
    startOfCampaign,
    endOfCampaign,
  } = props;

  let star = null;
  if (!token || isGraduate) {
    star = (
      <Tooltips content='Будь ласка, увійдіть!'>
        <Star liked={liked} handleClick={handleClick} />
      </Tooltips>
    );
  }

  return (
    <div
      data-testid='card'
      id='institutionOfEducationCard'
      data-id={props.id}
      className={styles.card}
    >
      {star}
      <h2 className={styles.card__title}>{abbreviation}</h2>
      <div className={styles.card__contentContainer}>
        <div className={styles.card__content}>
          <div className={styles.card__content__wrapper}>
            <a
              href={site}
              target='_blank'
              className={styles.card__content__desc}
            >
              <span className={styles.card__content__subtitle}>Сайт:</span>
              {site}
            </a>
            <br />
            <p className={styles.card__content__desc}>
              <span className={styles.card__content__subtitle}>Адреса:</span>
              {address}
            </p>
            <br />
            <p className={styles.card__content__desc}>
              <span className={styles.card__content__subtitle}>Опис:</span>
              {description}
            </p>
          </div>
          <Link
            id='moreDetailsButton'
            to={`/institutionOfEducation/${id}`}
            className={`${styles.card__content__link} ${styles.animatedButton}`}
          >
            Детальніше
          </Link>
        </div>

        <CampaingCard start={startOfCampaign} end={endOfCampaign} />
      </div>
      <div className={styles.card__img}>
        <img src='assets/images/universityCard.svg' alt='UniversityCard' />
      </div>
    </div>
  );
};

export default InstitutionOfEducationCard;
