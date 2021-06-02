import React from 'react';
import styles from './pagination.module.scss';
import Arrow from '../common/icons/Arrow';

const Pagination = ({ totalPages, currentPage, setCurrentPage, pages }) => {
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
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        <Arrow />
      </div>
      {pages.map((page, index) => {
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
