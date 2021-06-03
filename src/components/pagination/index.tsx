import React from 'react';
import styles from './pagination.module.scss';
import Arrow from '../common/icons/Arrow';

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Function;
  pages: number[];
}

const Pagination: React.FC<Props> = (props: Props) => {
  const { totalPages, currentPage, setCurrentPage, pages } = props;

  return (
    <div
      id='pagination'
      data-testid='pagination'
      className={totalPages ? `${styles.pages}` : `${styles.hiddenElement}`}
    >
      <div
        id='prevPage'
        data-testid='prevPage'
        className={
          currentPage === 1
            ? `${styles.arrow} ${styles.arrow__prev} ${styles.arrowUnable}`
            : `${styles.arrow} ${styles.arrow__prev}`
        }
        onClick={() => {
          if (currentPage === 1) {
            return;
          } else {
            setCurrentPage((currentPage - 1) as number);
          }
        }}
      >
        <Arrow />
      </div>
      {pages.map((page: any, index: any) => {
        return (
          <span
            data-testid='currentPage'
            className={
              currentPage === page
                ? `${styles.page} ${styles.page__current}`
                : `${styles.page}`
            }
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        );
      })}
      <div
        id='nextPage'
        data-testid='nextPage'
        className={
          currentPage === totalPages
            ? `${styles.arrow} ${styles.arrow__next} ${styles.arrowUnable}`
            : `${styles.arrow} ${styles.arrow__next}`
        }
        onClick={() => {
          if (currentPage === totalPages) {
            return;
          } else {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        <Arrow />
      </div>
    </div>
  );
};

export default Pagination;
