import React from 'react';
import styles from './universityInfo.module.scss';
import { Link } from 'react-router-dom';

const UniversityInfo = () => {
  const { name, abbreviation, site, address, phone, email, description } = {
    name:
      'Національний університет водного господарства та природокористування',
    abbreviation: 'НУВГП',
    site: 'https://nuwm.edu.ua/',
    address: 'вулиця Соборна, 11, Рівне, Рівненська область, 33000',
    phone: '380362633209',
    email: 'mail@nuwm.edu.ua',
    description:
      'Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу.',
  };
  return (
    <main className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <h2 className={styles.infoContainer__abbr}>{abbreviation}</h2>
        <div className={styles.infoContainer__mainInfo}>
          <div className={styles.infoContainer__textInfo}>
            <h1 className={styles.infoContainer__textInfo__fullName}>{name}</h1>
            <p>
              <span>Сайт:</span>
              <a href={site} target='_blank'>
                {site}
              </a>
            </p>
            <p>
              <span>Email:</span>
              <a href={`mailto:${email}`} target='_blank'>
                {email}
              </a>
            </p>
            <p>
              <span>Телефон:</span>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
            <p>
              <span>Адреса:</span>
              {address}
            </p>
          </div>
          <img
            src='https://nuwm.edu.ua/images/content/admin/nuwmvsh.jpg'
            alt='НУВГП'
          />
        </div>
        <p className={styles.description}>
          <span>Опис:</span>
          {description}
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
