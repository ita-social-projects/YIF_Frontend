import React from 'react';
import styles from './superAdminAccountPage.module.scss';
import ErrorBoundry from '../../../errorBoundry';
import {
  Header,
  Footer,
  AdminPanel,
  SuperAdminAccount,
} from '../../../components';

const SuperAdminAccountPage: React.FC = () => {
  const universityAdmins = [
    {
      id: '12ewr33',
      universityAbbreviation: 'НУВГП',
      universityName:
        'Національний університет водного господарства та природокористування',
      email: 'email222234@gmail.com',
      isBanned: false,
      isDisabled: false,
      photo: '',
    },
    {
      id: '123ewr3',
      universityAbbreviation: 'КПІ',
      universityName:
        'Київський політехнічний інститут імені Ігоря Сікорського',
      email: 'email1234@gmail.com',
      isBanned: false,
      isDisabled: false,
      photo: '',
    },
    {
      id: '12fsdf33',
      universityAbbreviation: 'ОА',
      universityName: 'Національний університет "Острозька академія"',
      email: 'press@oa.edu.ua',
      isBanned: false,
      isDisabled: false,
      photo: '',
    },
    {
      id: '1fasdf233',
      universityAbbreviation: 'НАВС',
      universityName: 'Академія внутрішніх військ МВС України',
      email: 'email34@gmail.com',
      isBanned: true,
      isDisabled: false,
      photo: '',
    },
    {
      id: '1fdsf233',
      universityAbbreviation: 'МЕГУ',
      universityName:
        'Міжнародний економіко-гуманітарний університет імені академіка Степана Дем’янчука',
      name: 'Тарас',
      email: 'mail@megu.edu.ua',
      isBanned: true,
      isDisabled: false,
      photo: 'assets/icons/avatar.jpg',
    },
    {
      id: '12fdfd33',
      universityAbbreviation: 'РДГУ',
      universityName: 'Рівненський державний гуманітарний університет',
      name: 'Михайло',
      email: 'info@rshu.edu.ua',
      isBanned: false,
      isDisabled: false,
      photo: 'assets/icons/avatar.jpg',
    },
  ];
  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.superAdminAccountPage}>
          <AdminPanel />
          <SuperAdminAccount universityAdmins={universityAdmins} />
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default SuperAdminAccountPage;
