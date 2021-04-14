import React from 'react';
import styles from './institutionOfEducationInfo.module.scss';
import InstitutionOfEducationBlock from '../../../components/institutionOfEducationBlock';
import { Link, useRouteMatch } from 'react-router-dom';

const InstitutionOfEducationInfo = () => {
  
  const { path } = useRouteMatch();

  const { id, name, abbreviation, site, address, phone, email, description } = {
    id: 'e2bd4ad9-060b-4d53-8222-9f3e5efbcfc7',
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
        <InstitutionOfEducationBlock 
        id={id}
        name={name}
        abbreviation={abbreviation}
        site={site}
        address={address}
        phone={phone}
        email={email}
        description={description}
        />
        <Link
          className={`${styles.animatedButton} ${styles.buttonLink}`}
          to={`${path}/edit/${id}`}
        >
          Редагувати
        </Link>
      </div>
    </main>
  );
};

export default InstitutionOfEducationInfo;
