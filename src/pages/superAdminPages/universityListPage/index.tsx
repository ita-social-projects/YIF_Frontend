import React, { useState } from 'react';
import Pagination from '../../../components/pagination';
import PaginationPagesCreator from '../../../components/pagination/paginationPagesCreator';
import SortingPanel from '../../../components/superAdmin/sortingPanel';
import UniversityItem from '../../../components/superAdmin/universityItem';
import styles from './universityListPage.module.scss';

const univList = [
  {
    id: '1',
    abbreviation: 'НУВГП',
    name: 'Національний університет водного господарства та природокористування',
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
  const [perPage] = useState(2);
  const numberOfPages = Math.ceil(univList.length / perPage);
  const [totalPages] = useState(numberOfPages);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = PaginationPagesCreator(totalPages, currentPage);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <main className={styles.universityListPage}>
          <h1>Університети</h1>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
          <SortingPanel />
          {univList
            .map((university) => {
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
            })
            .slice(indexOfFirstPost, indexOfLastPost)}
        </main>
      </div>
    </div>
  );
};

export default UniversityListPage;
