import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './institutionOfEducationCard.module.scss';
import Tooltips from '../common/tooltip';
import { useAuth } from '../../services/tokenValidator';
import { requestSecureData } from '../../services/requestDataFunction';
import { APIUrl } from '../../services/endpoints';
import CampaingCard from '../campaignCard';
import { store } from '../../store/store';
import Star from './star';

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
  // const [isLiked, setLiked] = useState(false);
  const { token, getToken } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });
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
        <Star isLiked={liked} handleClick={handleClick} />
      </Tooltips>
    );
  }
  // useEffect(() => {
  //   if (liked) setLiked(() => !isLiked);
  //   return () => {
  //     if (!liked) setLiked(() => isLiked);
  //   };
  // }, []);

  // const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
  //   if (token) {
  //     let itemImg = (e.target as Element).closest('svg');
  //     if (itemImg) setLiked(() => !isLiked);
  //     let institutionOfEducationId = (e.currentTarget as Element).getAttribute(
  //       'data-id'
  //     );
  //     let parentElem = itemImg?.parentElement;

  //     if (parentElem?.classList.contains(`${styles.card__icon__liked}`)) {
  //       itemImg &&
  //         sendDeleteFavoriteInstitutionOfEducation(
  //           `${APIUrl}InstitutionOfEducation/Favorites/${institutionOfEducationId}`,
  //           'DELETE'
  //         );
  //     } else {
  //       itemImg &&
  //         sendDeleteFavoriteInstitutionOfEducation(
  //           `${APIUrl}InstitutionOfEducation/Favorites/${institutionOfEducationId}`,
  //           'POST'
  //         );
  //     }
  //   }
  // };

  // let sendDeleteFavoriteInstitutionOfEducation = (
  //   endpointLikedInstitutionOfEducation: string,
  //   method: string
  // ) => {
  //   getToken();
  //   requestSecureData(endpointLikedInstitutionOfEducation, method, token!)
  //     .then((res: any) => {
  //       const statusCode = res.statusCode.toString();
  //       if (statusCode.match(/^[23]\d{2}$/)) {
  //         setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
  //         setSubmitted(false);
  //       } else {
  //         setError({
  //           hasError: true,
  //           errorStatusCode: res.statusCode,
  //           errorMessage:
  //             res.data.message || 'Щось пішло не так, спробуйте знову.',
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setError({
  //         hasError: true,
  //         errorStatusCode: error.statusCode,
  //         errorMessage: 'Щось пішло не так, спробуйте знову.',
  //       });
  //     });
  // };

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
