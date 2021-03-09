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
    <main className={styles.universityInfo}>
      <div className={styles.wrapper}>
        <h2>{univ.abbr}</h2>
        <div className={styles.main_info}>
          <div className={styles.text_info}>
            <h1>{univ.fullName}</h1>
            <p>
              <span>Сайт:</span>
              {univ.site}
            </p>
            <p>
              <span>Email:</span>
              {univ.email}
            </p>
            <p>
              <span>Телефон:</span>
              {univ.phoneNumber}
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
        <p>
          <span>Опис:</span>
          {univ.desc}
        </p>
        <Link to={`/moderators`}>Редагувати</Link>
      </div>
    </main>
  );
};

export default UniversityInfo;
