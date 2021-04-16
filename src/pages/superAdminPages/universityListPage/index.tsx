import React from 'react';
import { AdminPanel, Header } from '../../../components';
import Pagination from '../../../components/superAdmin/pagination';
import SortingPanel from '../../../components/superAdmin/sortingPanel';
import UniversityItem from '../../../components/superAdmin/universityItem';
import styles from './universityListPage.module.scss';

const univList = [
  {
    id: '1',
    abbreviation: 'НУВГП',
    name:
      'Національний університет водного господарства та природокористування',
    isBlocked: false,
  },
  {
    id: '2',
    abbreviation: 'РДГУ',
    name: 'Рівненський державний гуманітарний університет',
    isBlocked: true,
  },
  {
    id: '3',
    abbreviation: 'ОА',
    name: 'Національний університет "Острозька академія"',
    isBlocked: false,
  },
  {
    id: '4',
    abbreviation: 'НАВС',
    name: 'Академія внутрішніх військ МВС України',
    isBlocked: false,
  },
  {
    id: '5',
    abbreviation: 'КПІ',
    name: 'Київський політехнічний інститут імені Ігоря Сікорського',
    isBlocked: true,
  },
];

const UniversityListPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <main className={styles.universityListPage}>
          <h1>Університети</h1>
          <Pagination />
          <SortingPanel />
          {univList.map((university) => {
            const { id, name, abbreviation, isBlocked } = university;
            return (
              <UniversityItem
                key={id}
                abbreviation={abbreviation}
                fullName={name}
                isBlocked={isBlocked}
                handleBlocking={() => {}}
                handleEditing={() => {}}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default UniversityListPage;
