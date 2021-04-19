import { Link } from 'react-router-dom';
import styles from './specialityCard.module.scss';
import React, { useState } from 'react';

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

const arrowSVG = (
  <svg
    width='40'
    height='30'
    viewBox='0 0 40 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.70055 12.7754C1.81666 12.6881 1.9546 12.6189 2.10646 12.5716C2.25833 12.5243 2.42113 12.5 2.58555 12.5C2.74997 12.5 2.91277 12.5243 3.06463 12.5716C3.2165 12.6189 3.35443 12.6881 3.47055 12.7754L17.5856 23.3636L31.7006 12.7754C31.9353 12.5994 32.2536 12.5005 32.5856 12.5005C32.9175 12.5005 33.2358 12.5994 33.4706 12.7754C33.7053 12.9515 33.8371 13.1902 33.8371 13.4392C33.8371 13.6881 33.7053 13.9269 33.4706 14.1029L18.4706 25.3529C18.3544 25.4402 18.2165 25.5095 18.0646 25.5568C17.9128 25.604 17.75 25.6284 17.5856 25.6284C17.4211 25.6284 17.2583 25.604 17.1065 25.5568C16.9546 25.5095 16.8167 25.4402 16.7006 25.3529L1.70055 14.1029C1.58414 14.0158 1.49178 13.9124 1.42877 13.7985C1.36575 13.6846 1.33331 13.5625 1.33331 13.4392C1.33331 13.3159 1.36575 13.1938 1.42877 13.0799C1.49178 12.966 1.58414 12.8625 1.70055 12.7754Z'
      fill='black'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.70055 5.27543C1.81666 5.18812 1.9546 5.11885 2.10646 5.07159C2.25833 5.02433 2.42113 5 2.58555 5C2.74997 5 2.91277 5.02433 3.06463 5.07159C3.2165 5.11885 3.35443 5.18812 3.47055 5.27543L17.5856 15.8636L31.7006 5.27543C31.8168 5.18826 31.9547 5.11912 32.1066 5.07194C32.2584 5.02477 32.4212 5.00049 32.5856 5.00049C32.7499 5.00049 32.9127 5.02477 33.0645 5.07194C33.2164 5.11912 33.3543 5.18826 33.4706 5.27543C33.5868 5.36259 33.679 5.46607 33.7419 5.57996C33.8048 5.69384 33.8371 5.81591 33.8371 5.93918C33.8371 6.06245 33.8048 6.18451 33.7419 6.29839C33.679 6.41228 33.5868 6.51576 33.4706 6.60293L18.4706 17.8529C18.3544 17.9402 18.2165 18.0095 18.0646 18.0568C17.9128 18.104 17.75 18.1284 17.5856 18.1284C17.4211 18.1284 17.2583 18.104 17.1065 18.0568C16.9546 18.0095 16.8167 17.9402 16.7006 17.8529L1.70055 6.60293C1.58414 6.51584 1.49178 6.41239 1.42877 6.29849C1.36575 6.18459 1.33331 6.06249 1.33331 5.93918C1.33331 5.81586 1.36575 5.69376 1.42877 5.57986C1.49178 5.46597 1.58414 5.36251 1.70055 5.27543Z'
      fill='black'
    />
  </svg>
);
const starSVG = (
  <svg
    width='50'
    height='50'
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M23.5252 1.71854C23.7756 1.19408 24.2921 0.862061 24.8579 0.862061C25.4236 0.861959 25.9403 1.19398 26.1907 1.71843L31.9877 13.8608C32.5328 15.0025 33.5864 15.794 34.8052 15.977L47.7663 17.925C48.3262 18.0092 48.7912 18.4146 48.9662 18.9709C49.1408 19.5271 48.9952 20.1378 48.5901 20.5461L39.2121 29.9986C38.3302 30.8875 37.9278 32.168 38.1358 33.4229L40.3486 46.7673C40.4442 47.3438 40.215 47.9263 39.7573 48.2698C39.2997 48.6138 38.6929 48.659 38.1922 48.3868L26.5992 42.0866C25.5092 41.4942 24.2069 41.4942 23.1166 42.0868L11.5247 48.3867C11.0239 48.6589 10.4171 48.6133 9.95952 48.2696C9.50181 47.9258 9.27271 47.3431 9.36827 46.7669L11.5821 33.4235C11.7904 32.1682 11.3879 30.8875 10.5058 29.9984L1.12721 20.5462C0.722183 20.1379 0.576284 19.5272 0.751127 18.971C0.92597 18.4148 1.39104 18.0094 1.95089 17.9251L14.9116 15.9772C16.1304 15.794 17.1841 15.0026 17.7292 13.8607L23.5252 1.71854Z'
      fill='#B4C3D3'
    />
  </svg>
);

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
            <div className={`${styles.card__content__star}`}>{starSVG}</div>
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
                <strong>Форма навчання:</strong> {paymentForm}{' '}
              </p>
              <p>
                <strong>Форма оплати:</strong> {educationForm}{' '}
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

              <p>{arrowSVG}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialityCard;
