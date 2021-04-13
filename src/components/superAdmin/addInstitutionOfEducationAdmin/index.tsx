import React from 'react';
import styles from './addInstitutionOfEducation.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import InstitutionOfEducationBlock from '../../institutionOfEducationBlock';
import Unlock from '../../common/icons/Unlock/index';
import Delete from '../../common/icons/Delete/index';
import TabContent from './TabContent'

const AddInstitutionOfEducationAdmin = () => {
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
        <div className={styles.wrapper}>
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
          <div className={styles.admin}>
            <h2 className={styles.admin__title}>Адмін</h2>
            <div className={styles.admin__line}>
                <p className={styles.admin__line__name}>
                    Shanna@melissa.tv
                </p>
                <div className={styles.admin__line__icons}>
                    <Unlock  handleClick={()=>{}}/>
                    <Delete handleClick={()=>{}}/>
                </div>
            </div>
            <div className={styles.admin__buttons}>
              <TabContent />
            </div>
          </div>
        </div>
      </div>
      );
};

export default AddInstitutionOfEducationAdmin;
