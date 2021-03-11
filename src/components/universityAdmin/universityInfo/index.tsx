import React from 'react';
import styles from './universityInfo.module.scss';
import { Link } from 'react-router-dom';

const UniversityInfo = () => {
  const univ = {
    abbr: 'НУВГП',
    fullName:
      'Національний університет водного господарства та природокористування',
    site: 'https://nuwm.edu.ua/ ',
    email: 'mail@nuwm.edu.ua',
    phoneNumber: '380362633209',
    adress: 'вулиця Соборна, 11, Рівне, Рівненська область, 33000',
    desc:
      'Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу.',
  };
  return (
    <main className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <h2 className={styles.infoContainer__abbr}>{univ.abbr}</h2>
        <div className={styles.infoContainer__mainInfo}>
          <div className={styles.infoContainer__textInfo}>
            <h1 className={styles.infoContainer__textInfo__fullName}>
              {univ.fullName}
            </h1>
            <p>
              <span>Сайт:</span>
              <a href={univ.site} target='_blank'>
                {univ.site}
              </a>
            </p>
            <p>
              <span>Email:</span>
              <a href={`mailto:${univ.email}`} target='_blank'>
                {univ.email}
              </a>
            </p>
            <p>
              <span>Телефон:</span>
              <a href={`tel:${univ.phoneNumber}`}>{univ.phoneNumber}</a>
            </p>
            <p>
              <span>Адреса:</span>
              {univ.adress}
            </p>
          </div>
          <img
            src='https://nuwm.edu.ua/images/content/admin/nuwmvsh.jpg'
            alt='НУВГП'
          />
        </div>
        <p className={styles.description}>
          <span>Опис:</span>
          {univ.desc}
        </p>
        <Link
          className={`${styles.animatedButton} ${styles.buttonLink}`}
          to={`/moderators`}
        >
          Редагувати
        </Link>
      </div>
    </main>
  );
};

export default UniversityInfo;
