import React from 'react';
import styles from './pagination.module.scss';
import Arrow from '../../common/icons/Arrow';

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <div className={`${styles.leftArrow} ${styles.paginationItem}`}>
        <Arrow />
      </div>
      <div className={`${styles.pageNumbers} `}>
        <div className={`${styles.number} ${styles.paginationItem}`}>1</div>
        <div className={`${styles.number} ${styles.paginationItem}`}>2</div>
        <div className={`${styles.number} ${styles.paginationItem}`}>3</div>
      </div>
      <div className={`${styles.rightArrow} ${styles.paginationItem}`}>
        <Arrow />
      </div>
    </div>
  );
};

export default Pagination;
